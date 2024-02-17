import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourseModel } from './offeredCourse.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { timeConflict } from './offeredCourse.utils';
import QueryBuilder from '../../builder/QueryBuilder';
import { Student } from '../student/student.model';

// create offered course into db
const createOfferedCourseIntoDb = async (payload: TOfferedCourse) => {
  const {
    semesterRegistration,
    academicFaculty,
    academicDepartment,
    course: courseId,
    faculty,
    section,
    days,
    startTime,
    endTime,
  } = payload;

  // check semester registration
  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'this semester registration not exits',
    );
  }

  // check academic faculty
  const isAcademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isAcademicFacultyExits) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'this academic faculty not exits',
    );
  }

  // check academic Department
  const isAcademicDepartment =
    await AcademicDepartment.findById(academicDepartment);
  if (!isAcademicDepartment) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'this academic Department not exits',
    );
  }

  // check course
  const isCourseExits = await course.findById(courseId);
  if (!isCourseExits) {
    throw new AppError(httpStatus.BAD_REQUEST, 'this course not exits');
  }

  // check faculty
  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpStatus.BAD_REQUEST, 'this course not exits');
  }

  const academicSemester = isSemesterRegistrationExits?.academicSemester;

  // check if the department belong to the faculty
  const isDepartmentBelongFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });

  if (!isDepartmentBelongFaculty) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This ${isAcademicDepartment.name} is not belong ${isAcademicFacultyExits.name}`,
    );
  }

  const sameOfferedCourseExitsWithSameSection =
    await OfferedCourseModel.findOne({
      semesterRegistration,
      course: courseId,
      section,
    });

  if (sameOfferedCourseExitsWithSameSection) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'offered course is same section is already exits',
    );
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: [days] },
  }).select('days startTime endTime');

  const newSchedule = {
    startTime,
    endTime,
    days,
  };

  if (timeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'this faculty is not available at this time try another time or day',
    );
  }

  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// get offered course from db
const getOfferedCourseFromDb = async (query: Record<string, unknown>) => {
  const offeredCourseQuery = new QueryBuilder(OfferedCourseModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .filedFiltering();

  const result = await offeredCourseQuery.modelQuery;
  const meta = await offeredCourseQuery.countTotal();
  return {
    result,
    meta,
  };
};

// get my offered course from db
const getMyOfferedCourseFromDb = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  // check studen
  const student = await Student.findOne({ id: userId });

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'student not found');
  }

  // find current ongoing semester
  const currentOngoingSemester = await SemesterRegistration.findOne({
    status: 'ONGOING',
  });

  if (!currentOngoingSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'there is no semester ongoing');
  }

  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  const aggregationQuery = [
    {
      $match: {
        semesterRegistration: currentOngoingSemester._id,
        academicFaculty: student.academicFaculty,
        academicDepartment: student.academicDepartment,
      },
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'course',
      },
    },
    {
      $unwind: '$course',
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentOngoingSemester: currentOngoingSemester._id,
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$semesterRegistration', '$$currentOngoingSemester'],
                  },
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isEnrolled', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'enrolledCourse',
      },
    },
    {
      $lookup: {
        from: 'enrolledcourses',
        let: {
          currentStudent: student._id,
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  {
                    $eq: ['$student', '$$currentStudent'],
                  },
                  {
                    $eq: ['$isCompleted', true],
                  },
                ],
              },
            },
          },
        ],
        as: 'completedCourse',
      },
    },
    {
      $addFields: {
        completedCourseIds: {
          $map: {
            input: '$completedCourse',
            as: 'completed',
            in: '$$completed.course',
          },
        },
      },
    },
    {
      $addFields: {
        isPreRequisitesFulFilled: {
          $or: [
            { $eq: ['$course.preRequisiteCourse', []] },
            {
              $setIsSubset: [
                '$course.preRequisiteCourse.course',
                '$completedCourseIds',
              ],
            },
          ],
        },

        isAlreadyEnrolled: {
          $in: [
            '$course._id',
            {
              $map: {
                input: '$enrolledCourse',
                as: 'enroll',
                in: '$$enroll.course',
              },
            },
          ],
        },
      },
    },
    {
      $match: {
        isAlreadyEnrolled: false,
        isPreRequisitesFulFilled: true,
      },
    },
  ];

  const pagination = [
    {
      $skip: skip,
    },
    {
      $limit: limit,
    },
  ];

  const result = await OfferedCourseModel.aggregate([
    ...aggregationQuery,
    ...pagination,
  ]);

  const total = (await OfferedCourseModel.aggregate(aggregationQuery)).length;
  const totalPage = Math.ceil(total / limit);

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    result,
  };
};

// get single offered course from db
const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};

// update offeredCourse from db
const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  // check offered course is exist
  const { faculty, days, startTime, endTime } = payload;
  const isOfferedCourseIsExists = await OfferedCourseModel.findById(id);
  if (!isOfferedCourseIsExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'offered course is not found, provide valid id !',
    );
  }

  // check faculty is exits
  const isFacultyIsExists = await Faculty.findById(faculty);
  if (!isFacultyIsExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'faculty is not found, provide valid id !',
    );
  }

  // check semesterRegistration is ONGOING
  const semesterRegistration = isOfferedCourseIsExists.semesterRegistration;
  const isSemesterIsOngoing =
    await SemesterRegistration.findById(semesterRegistration);
  if (isSemesterIsOngoing?.status !== 'UPCOMING') {
    throw new AppError(
      httpStatus.NOT_FOUND,
      `semester registration is ${isSemesterIsOngoing?.status}. update not possible`,
    );
  }

  const assignedSchedules = await OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: { $in: [days] },
  }).select('days startTime endTime');

  const newSchedule = {
    startTime,
    endTime,
    days,
  };

  if (timeConflict(assignedSchedules, newSchedule)) {
    throw new AppError(
      httpStatus.CONFLICT,
      'this faculty is not available at this time try another time or day',
    );
  }
  const result = await OfferedCourseModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const offeredCourseService = {
  createOfferedCourseIntoDb,
  getOfferedCourseFromDb,
  getMyOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseFromDB,
};
