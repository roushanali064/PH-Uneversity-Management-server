import { Schema, model } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";
import { days } from "./offeredCourse.constant";

const offeredCourseSchema = new Schema<TOfferedCourse>({
    semesterRegistration: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'SemesterRegistration'
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicSemester'
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'academicFaculty'
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'AcademicDepartMent'
    },
    course: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Courses'
    },
    faculty: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Faculty'
    },
    maxCapacity: {
        type: Number,
        required: true
    },
    section: {
        type: Number,
        required: true
    },
    days: {
        type: String,
        required: true,
        enum: days
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    }
})


export const OfferedCourseModel = model<TOfferedCourse>('OfferedCourse', offeredCourseSchema)