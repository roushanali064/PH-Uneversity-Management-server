import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TSemesterRegistration } from './semesterRegistration.interface';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { registrationStatus } from './semesterRegistration.conostant';

// create semester registration into db
const createSemesterRegistrationIntiDB = async (
  payload: TSemesterRegistration,
) => {
  //check  'UPCOMING'| 'ONGOING'|'ENDED'
  const isThereAnyUPCOMINGOrONGOINGSemester =
    await SemesterRegistration.findOne({
      $or: [
        { status: registrationStatus.upcoming },
        { status: registrationStatus.ongoing },
      ],
    });

  if (isThereAnyUPCOMINGOrONGOINGSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `there is already a ${isThereAnyUPCOMINGOrONGOINGSemester.status} registered semester`,
    );
  }

  // check academic semester exits
  const academicSemester = payload?.academicSemester;
  const isAcademicSemesterExits =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExits) {
    throw new AppError(httpStatus.NOT_FOUND, 'academic semester not found');
  }

  // check this semester is already exits
  const isSemesterRegistrationAllReadyExits =
    await SemesterRegistration.findOne({ academicSemester });

  if (isSemesterRegistrationAllReadyExits) {
    throw new AppError(
      httpStatus.CONFLICT,
      'semester registration already exits',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

// get single semester registration from db
const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};

// get all semester registration from db
const getAllSemesterREgistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester'),
    query,
  )
    .filter()
    .paginate()
    .sort();

  const meta = await semesterRegistrationQuery.countTotal();
  const result = await semesterRegistrationQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// update semester registration into db
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationAllReadyExits =
    await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationAllReadyExits) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'semester registration not found ',
    );
  }

  const currentSemesterStatus = isSemesterRegistrationAllReadyExits?.status;
  const requestSemesterStatus = payload?.status;

  if (currentSemesterStatus === registrationStatus.ended) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === registrationStatus.upcoming &&
    requestSemesterStatus === registrationStatus.ended
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === registrationStatus.ongoing &&
    requestSemesterStatus === registrationStatus.upcoming
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `this semester ${currentSemesterStatus}`,
    );
  }

  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const constSemesterRegistrationService = {
  createSemesterRegistrationIntiDB,
  getSingleSemesterRegistrationFromDB,
  getAllSemesterREgistrationFromDB,
  updateSemesterRegistrationIntoDB,
};
