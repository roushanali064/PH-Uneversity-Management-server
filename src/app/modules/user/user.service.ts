import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utitly';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const user: Partial<TUser> = {};
  // set default password
  user.password = password || (config.default_password as string);
  user.role = 'student';

  // find academic semester data
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

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

export const userService = {
  createStudentIntoDB,
};
