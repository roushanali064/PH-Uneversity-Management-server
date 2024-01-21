/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { OfferedCourseModel } from '../offeredCourse/offeredCourse.model';
import { TEnrolledCourse } from './enrolledCourse.interface';
import { Student } from '../student/student.model';
import EnrolledCourseModel from './enrolledCourse.model';
import mongoose from 'mongoose';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { course } from '../course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { calculateGrade } from './enrolledCourse.utils';

const createEnrolledCourseInToDB = async (
  userId: string,
  payload: TEnrolledCourse,
) => {
  const { offeredCourse } = payload;

  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  if (isOfferedCourseExists.maxCapacity <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Room is full !');
  }

  const student = await Student.findOne({ id: userId }).select('_id');

  if (!student) {
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const isStudentAlreadyEnrolled = await EnrolledCourseModel.findOne({
    semesterRegistration: isOfferedCourseExists?.semesterRegistration,
    offeredCourse,
    student: student._id,
  });

  if (isStudentAlreadyEnrolled) {
    throw new AppError(httpStatus.CONFLICT, 'student already enroll');
  }

  const semesterRegistration = await SemesterRegistration.findById(isOfferedCourseExists.semesterRegistration).select('maxCredit');
  const maxCredit = semesterRegistration?.maxCredit

  const courses = await course.findById(isOfferedCourseExists.course)
  const currentCredit = courses?.credit

  const enrolledCourse = await EnrolledCourseModel.aggregate([
    {
      $match: {
        semesterRegistration: isOfferedCourseExists.semesterRegistration,
        student: student._id
      }
    },
    {
      $lookup: {
        from: 'courses',
        localField: 'course',
        foreignField: '_id',
        as: 'enrolledCourse'
      }
    },
    {
      $group: {
        _id: null,
        totalCredits: {$sum: '$enrolledCourse.credits'}
      }
    },
    {
      $project: {
        _id: 0,
        totalCredits: 1
      }
    }
  ])

  const totalCredits = enrolledCourse.length > 0 ? enrolledCourse[0].totalCredits : 0

  if(totalCredits && maxCredit && totalCredits + currentCredit > maxCredit){
    throw new AppError(httpStatus.BAD_REQUEST,'you have exceeded maximum number of credits')
  }

  const session = await mongoose.startSession();

  try {
        await session.startTransaction();

        const result = await EnrolledCourseModel.create(
        [
            {
            semesterRegistration: isOfferedCourseExists.semesterRegistration,
            academicSemester: isOfferedCourseExists.academicSemester,
            academicFaculty: isOfferedCourseExists.academicFaculty,
            academicDepartment: isOfferedCourseExists.academicDepartment,
            offeredCourse,
            course: isOfferedCourseExists.course,
            student: student._id,
            faculty: isOfferedCourseExists.faculty,
            isEnrolled: true,
            },
        ],
        { session },
        );

        const maxCapacity = isOfferedCourseExists.maxCapacity;

        await OfferedCourseModel.findByIdAndUpdate(offeredCourse, {
        maxCapacity: maxCapacity - 1,
        });

        await session.commitTransaction()
        await session.endSession()

        return result

    }catch(err){
        await session.abortTransaction()
        await session.endSession()
        console.log(err);
        throw new AppError(httpStatus.BAD_REQUEST, 'enrolled course  failed');
    }
};

// update course marks
const updateCourseMarksInToDB =async (facultyId:string, payload: Partial<TEnrolledCourse>) => {
  const {semesterRegistration,offeredCourse,student, courseMarks} = payload;
  const isOfferedCourseExists =
    await OfferedCourseModel.findById(offeredCourse);

  if (!isOfferedCourseExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'offered course not found');
  }

  const isSemesterRegistrationExists =
    await SemesterRegistration.findById(semesterRegistration);

  if (!isSemesterRegistrationExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'semester registration not found');
  }

  const isStudentExists =
    await Student.findById(student);

  if (!isStudentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'student  not found');
  }

  const isFacultyExits = await Faculty.findOne({id: facultyId})
  if (!isFacultyExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'Faculty  not found');
  }

  const isCourseBelongToFaculty = await EnrolledCourseModel.findOne({
    semesterRegistration,
    offeredCourse,
    student,
    faculty: isFacultyExits._id
  })
  if (!isCourseBelongToFaculty) {
    throw new AppError(httpStatus.FORBIDDEN, 'Faculty  is forbidden');
  }

  // update 
  const modifiedData: Record<string,unknown> = {
    ...courseMarks
  }

  if(courseMarks?.finalTerm){
    const {classTaste1, classTest2, midTerm} = isCourseBelongToFaculty.courseMarks
    const totalMark = Math.ceil(classTaste1*0.1)+Math.ceil(midTerm*0.3)+Math.ceil(classTest2*0.1)+Math.ceil(courseMarks.finalTerm)
    const result = calculateGrade(totalMark)
    modifiedData.grade = result.grade
    modifiedData.gradePoint = result.gradePoint
    modifiedData.isCompleted  = true
  }

  if(courseMarks && Object.keys(courseMarks).length){
    for(const [key,value] of Object.entries(courseMarks)){
      modifiedData[`courseMarks.${key}`] = value
    }
  }
  const result = await EnrolledCourseModel.findByIdAndUpdate(
    isCourseBelongToFaculty._id,
    modifiedData,
    {
      new: true
    }
  )
  return result
}

export const enrolledCourseService = {
  createEnrolledCourseInToDB,
  updateCourseMarksInToDB
};
