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
    endTime
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

  const assignedSchedules = await  OfferedCourseModel.find({
    semesterRegistration,
    faculty,
    days: {$in: [days]}
  }).select('days startTime endTime')

  const newSchedule = {
    startTime,
    endTime,
    days
  }

    if(timeConflict(assignedSchedules, newSchedule)){
        throw new AppError(httpStatus.CONFLICT, 'this faculty is not available at this time try another time or day')
    }


  const result = await OfferedCourseModel.create({
    ...payload,
    academicSemester,
  });
  return result;
};

// get offered course from db
const getOfferedCourseFromDb = async () => {
  const result = await OfferedCourseModel.find();
  return result;
};

// get single offered course from db
const getSingleOfferedCourseFromDb = async (id: string) => {
  const result = await OfferedCourseModel.findById(id);
  return result;
};

// update offeredCourse from db
const updateOfferedCourseFromDB =async (id:string, payload: Pick<TOfferedCourse, 'faculty'| 'days' | 'startTime' | 'endTime'>) => {
    // check offered course is exist
    const {faculty, days, startTime, endTime} = payload
    const isOfferedCourseIsExists = await OfferedCourseModel.findById(id);
    if(!isOfferedCourseIsExists){
        throw new AppError(httpStatus.NOT_FOUND,'offered course is not found, provide valid id !')
    };

    // check faculty is exits
    const isFacultyIsExists = await Faculty.findById(faculty);
    if(!isFacultyIsExists){
        throw new AppError(httpStatus.NOT_FOUND,'faculty is not found, provide valid id !')
    }

    // check semesterRegistration is ONGOING
    const semesterRegistration = isOfferedCourseIsExists.semesterRegistration
    const isSemesterIsOngoing = await SemesterRegistration.findById(semesterRegistration);
    if(isSemesterIsOngoing?.status !== "UPCOMING"){
        throw new AppError(httpStatus.NOT_FOUND,`semester registration is ${isSemesterIsOngoing?.status}. update not possible`)
    }

    const assignedSchedules = await  OfferedCourseModel.find({
        semesterRegistration,
        faculty,
        days: {$in: [days]}
      }).select('days startTime endTime')
    
      const newSchedule = {
        startTime,
        endTime,
        days
      }
    
    if(timeConflict(assignedSchedules, newSchedule)){
        throw new AppError(httpStatus.CONFLICT, 'this faculty is not available at this time try another time or day')
    }
    const result = await OfferedCourseModel.findByIdAndUpdate(id,payload,{new:true,runValidators: true})
    return result
}

export const offeredCourseService = {
  createOfferedCourseIntoDb,
  getOfferedCourseFromDb,
  getSingleOfferedCourseFromDb,
  updateOfferedCourseFromDB
};
