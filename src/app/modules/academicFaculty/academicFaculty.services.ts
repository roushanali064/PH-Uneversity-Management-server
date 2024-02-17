import QueryBuilder from '../../builder/QueryBuilder';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create academic faculty from db
const createAcademicFacultyInToDB = async (payload: TAcademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

// get all academic faculty from db
const getAllAcademicFacultyFromDb = async (query: Record<string, unknown>) => {
  const academicFacultyQuery = new QueryBuilder(AcademicFaculty.find(), query)
    .filter()
    .sort()
    .paginate()
    .filedFiltering();
  const result = await academicFacultyQuery.modelQuery;
  const meta = await academicFacultyQuery.countTotal();
  return {
    result,
    meta,
  };
};

// get single Academic Faculty From Db
const singleAcademicFacultyFromDb = async (payload: string) => {
  const result = AcademicFaculty.findOne({ _id: payload });
  return result;
};

// update Academic Faculty From DB
const updateAcademicFacultyFromDB = (id: string, payload: TAcademicFaculty) => {
  const result = AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicFacultyServices = {
  createAcademicFacultyInToDB,
  getAllAcademicFacultyFromDb,
  singleAcademicFacultyFromDb,
  updateAcademicFacultyFromDB,
};
