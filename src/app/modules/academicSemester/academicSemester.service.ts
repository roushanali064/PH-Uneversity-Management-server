import QueryBuilder from '../../builder/QueryBuilder';
import { academicSemesterMapper } from './academicSemester.constants';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterInToDB = async (payload: TAcademicSemester) => {
  if (academicSemesterMapper[payload.name] !== payload.code) {
    throw new Error(`Invalid semester code ${payload?.code}`);
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

// get all academic semester
const getAllAcademicSemesterInToDB = async (query: Record<string, unknown>) => {
  const academicSemesterQuery = new QueryBuilder(AcademicSemester.find(), query)
    .filter()
    .sort()
    .paginate()
    .filedFiltering();
  const result = await academicSemesterQuery.modelQuery;
  const meta = await academicSemesterQuery.countTotal();
  return {
    meta,
    result,
  };
};

// find a academic semester
const singleAcademicSemesterInToDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

// update academic semester
const updateAcademicSemesterInToDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterMapper[payload.name] !== payload.code
  ) {
    throw new Error(`Invalid semester code ${payload?.code}`);
  }

  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  createAcademicSemesterInToDB,
  getAllAcademicSemesterInToDB,
  singleAcademicSemesterInToDB,
  updateAcademicSemesterInToDB,
};
