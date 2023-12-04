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
const getAllAcademicSemesterInToDB = async () => {
  const result = await AcademicSemester.find();
  return result;
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
    throw new Error(`Invalid semester code ${payload?.code}`)
  }

  const result = await AcademicSemester.findOneAndUpdate({_id: id}, payload, {new: true})
  return result
};

export const academicSemesterServices = {
  createAcademicSemesterInToDB,
  getAllAcademicSemesterInToDB,
  singleAcademicSemesterInToDB,
  updateAcademicSemesterInToDB
};
