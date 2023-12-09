import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// get all student into db
const getAllStudentsFromDB = async () => {
  const result = await Student.find().populate('user').populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  return result;
};

// get single student into db
const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id }).populate('user').populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });
  return result;
};

// update student into db
const updateStudentInToDb =async (id:string, payload: Partial<TStudent>) => {

  const {name, guardian, localGuardian, ...remainingStudentData} = payload

  const modifiedUpdateData: Record<string,unknown> = {
    ...remainingStudentData
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdateData[`name.${key}`] = value
      console.log(`${key } and ${value}`);
    }
  }

  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdateData[`guardian.${key}`] = value
    }
  }

  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdateData[`localGuardian.${key}`] = value
    }
  }
  
  const result = await Student.findOneAndUpdate(
    {id},
    modifiedUpdateData,
    {new: true, runValidators: true}
  )
  return result

}

// delete student into db
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
  deleteSingleStudentsFromDB,
  updateStudentInToDb
};
