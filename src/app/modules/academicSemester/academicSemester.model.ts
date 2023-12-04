import { Schema, model } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterMonths,
  AcademicSemesterName,
} from './academicSemester.constants';

const academicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum: AcademicSemesterName,
  },
  code: {
    type: String,
    required: true,
    enum: AcademicSemesterCode,
  },
  year: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterMonths,
  },
  endMonth: {
    type: String,
    required: true,
    enum: AcademicSemesterMonths,
  },
},{
    timestamps: true
});

// middleware

academicSemesterSchema.pre('save', async function(next){
    const isSemesterExists = await AcademicSemester.findOne({
        name: this.name,
        year: this.year
    })

    if(isSemesterExists){
        throw new Error(`${this.name} semester is already exists`)
    }else{
        next()
    }
})

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
