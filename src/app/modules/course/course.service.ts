import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { courseSearchAbleFields } from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import { CourseFaculty, course } from './course.model';
import AppError from '../../error/AppError';
import httpStatus from 'http-status';

// create course into db
const createCourseIntoDb = async (payload: TCourse) => {
  const result = await course.create(payload);
  return result;
};

// get all course
const getAllCourseInToDB = async (query: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    course.find().populate('preRequisiteCourse.course'),
    query,
  )
    .search(courseSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .filedFiltering();
  const result = await courseQuery.modelQuery;
  const meta = await courseQuery.countTotal();
  return {
    result,
    meta,
  };
};

// get single course
const getSingleCourseInToDB = async (id: string) => {
  const result = await course
    .findById(id)
    .populate('preRequisiteCourse.course');
  return result;
};

// update course
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourse, ...remainingCourseData } = payload;

  const session = await mongoose.startSession();

  try {
    await session.startTransaction();

    const updateCourse = await course.findByIdAndUpdate(
      id,
      remainingCourseData,
      { new: true, runValidators: true, session },
    );

    if (!updateCourse) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }

    if (preRequisiteCourse && preRequisiteCourse.length > 0) {
      const deletedPrerequisiteCourse = preRequisiteCourse
        .filter((el) => el.course && el.isDeleted)
        .map((el) => el.course);

      const deletedPrerequisiteCourseIntoDB = await course.findByIdAndUpdate(
        id,
        {
          $pull: {
            preRequisiteCourse: { course: { $in: deletedPrerequisiteCourse } },
          },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!deletedPrerequisiteCourseIntoDB) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to delete prerequisite course into Db',
        );
      }

      const newPrerequisiteCourse = preRequisiteCourse.filter(
        (el) => el.course && !el.isDeleted,
      );

      const updatePrerequisiteCourseInToDb = await course.findByIdAndUpdate(
        id,
        {
          $addToSet: { preRequisiteCourse: { $each: newPrerequisiteCourse } },
        },
        {
          new: true,
          runValidators: true,
          session,
        },
      );

      if (!updatePrerequisiteCourseInToDb) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          'Failed to update Prerequisite Course data',
        );
      }
    }

    const result = await course
      .findById(id)
      .populate('preRequisiteCourse.course');

    await session.commitTransaction();
    await session.endSession;

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
  }
};

// delete course
const deleteCourseFromToDB = async (id: string) => {
  const result = await course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};

// assign faculties into db
const assignFacultiesIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      course: id,
      $addToSet: { faculties: { $each: payload } },
    },
    {
      upsert: true,
      new: true,
    },
  );

  return result;
};

const getFacultiesInCourseIntoDB = async (courseId: string) => {
  const result = await CourseFaculty.findOne({ course: courseId }).populate(
    'faculties',
  );

  return result;
};

// remove faculties into db
const removeFacultiesIntoDB = async (id: string, payload: TCourseFaculty) => {
  const result = await CourseFaculty.findByIdAndUpdate(
    id,
    {
      $pull: { faculties: { $in: payload } },
    },
    {
      new: true,
      runValidators: true,
    },
  );

  return result;
};

export const courseService = {
  createCourseIntoDb,
  getAllCourseInToDB,
  getSingleCourseInToDB,
  updateCourseIntoDB,
  deleteCourseFromToDB,
  assignFacultiesIntoDB,
  getFacultiesInCourseIntoDB,
  removeFacultiesIntoDB,
};
