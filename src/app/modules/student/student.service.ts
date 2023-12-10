import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// get all student into db
const getAllStudentsFromDB = async (query: Record<string,unknown>) => {
  const queryObj ={...query}

  // search
  let searchTerm = '';
  if(query?.searchTerm){
    searchTerm = query?.searchTerm as string
  }

  const studentSearchableFiled = ['name.firstName','name.lastName','email'];

  const searchQuery = Student.find({
    $or: studentSearchableFiled.map((filed)=>({
      [filed] : {$regex: searchTerm, $options: 'i'}
    }))
  })

  // filtering
  const excludeFiled = ['searchTerm','sort','limit','page','fields'];
  excludeFiled.forEach((el)=> delete queryObj[el])

  const filtering =  searchQuery.find(queryObj)

  // sorting
  let sort = '-createdAt'
  if(query?.sort){
    sort = query.sort as string
  }

  const sorting = filtering.sort(sort)

  // limiting and pagination
  let page = 1
  let limit = 0
  let skip = 0
  if(query?.limit){
    limit = Number(query.limit)
  }

  if(query?.page){
    page = Number(query?.page)
    skip = (page-1)*10
  }
  
  const skipData = sorting.skip(skip)

  const limiting =  skipData.limit(limit)

  let fields = '-__v';

  if(query?.fields){
    fields = (query?.fields as string).split(',').join(' ')
  }
  console.log(query);

  const filedFiltering = await limiting.select(fields).populate('user').populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate:{
      path: 'academicFaculty'
    }
  });

  return filedFiltering;
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
