import { Schema, model } from 'mongoose';
import {
  TCourse,
  TCourseFaculty,
  TPreRequisiteCourse,
} from './course.interface';

const preRequisiteCourse = new Schema<TPreRequisiteCourse>({
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  prefix: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: Number,
    trim: true,
    required: true,
  },
  credit: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourse: [preRequisiteCourse],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const course = model<TCourse>('Course', courseSchema);

const assignFacultiesWithCourseSchema = new Schema<TCourseFaculty>({
  course: {
    type: Schema.ObjectId,
    ref: 'Course',
    unique: true,
  },
  faculties: {
    type: [Schema.ObjectId],
    ref: 'Faculty',
  },
});

export const CourseFaculty = model<TCourseFaculty>(
  'CourseFaculties',
  assignFacultiesWithCourseSchema,
);
