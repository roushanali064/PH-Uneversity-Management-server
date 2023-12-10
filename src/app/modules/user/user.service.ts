import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateFacultyId, generateStudentId } from './user.utitly';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { Faculty } from '../faculty/faculty.model';

// create user and student
const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  // set default password
  user.password = password || (config.default_password as string);
  user.role = 'student';

  // find academic semester data
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if(!admissionSemester){
    throw new AppError(httpStatus.NOT_FOUND,"academic semester not fount")
  }

  const session = await mongoose.startSession();

  try {
    await session.startTransaction()
    // set user id
    user.id = await generateStudentId(admissionSemester);

    // create user
    const createUser = await User.create([user], { session });

    // create a student
    if (!createUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    payload.id = createUser[0].id;
    payload.user = createUser[0]._id;

    // create student
    const createStudent = await Student.create([payload], { session });

    if (!createStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    await session.commitTransaction();
    await session.endSession();

    return createStudent;
  } catch (err) {
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'user create failed');
  }
};

// create faculty in to db
const createFacultyInToDb = async (password: string, payload: TFaculty) =>{
  const user: Partial<TUser> = {};

  // set password
  user.password = password || (config.default_password)

  // set role
  user.role = 'faculty'

  // check academic department is exits or not
  const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment)
  if(!academicDepartment){
    throw new AppError(httpStatus.NOT_FOUND, "academic department is not found")
  }

  const session =  await mongoose.startSession()

  try{

    await session.startTransaction()

    user.id = await generateFacultyId();
    console.log('ex log',user.id);

    const newUser = await User.create([user],{session})

    if(!newUser.length){
      throw new AppError(httpStatus.BAD_REQUEST, "User create filed")
    }

    payload.id = newUser[0].id
    payload.user = newUser[0]._id

    const createFaculty = await Faculty.create([payload],{session})

    if(!createFaculty){
      throw new AppError(httpStatus.BAD_REQUEST, 'faculty create filed')
    }

    await session.commitTransaction()
    await session.endSession()

    return createFaculty

  }catch(err){
    await session.abortTransaction()
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'user create failed');
  }

}

export const userService = {
  createStudentIntoDB,
  createFacultyInToDb
};
