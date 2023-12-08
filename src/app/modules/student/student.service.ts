import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';

const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('user').populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('user').populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  return result;
};

const deleteSingleStudentsFromDB = async (id: string) => {
  
  const session = await mongoose.startSession()

  try{
    await session.startTransaction()

    const studentData = await Student.findOneAndUpdate(
      { id },
      {isDeleted: true},
      {new: true, session}
    );

    if(!studentData){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to remove student')
    }

    const userData = await User.findOneAndUpdate(
      { id },
      {isDeleted: true},
      {new: true, session}
    )

    if(!userData){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to remove user')
    }

    await session.commitTransaction()
    await session.endSession()

    return studentData;
  }catch(err){
    await session.abortTransaction()
    await session.endSession()
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB
};
