import z from 'zod';
import { days } from './offeredCourse.constant';

const timeFormatValidationSchema = z.string().refine((time)=>{
    const regex = /^([01]\d|2[0-3]):[0-5]\d$/
    return regex.test(time)
},
{
    message: 'Invalid Date Formate Expected "HH:MM"  24 Hours Formate'
}
)

const createOfferedCourseValidationSchema = z.object({
    body: z.object({
        semesterRegistration: z.string(),
        academicFaculty: z.string(),
        academicDepartment: z.string(),
        course: z.string(),
        faculty: z.string(),
        maxCapacity: z.number(),
        section: z.number(),
        days: z.array(z.enum([...days] as [string, ...string[]])),
        startTime: timeFormatValidationSchema,
        endTime: timeFormatValidationSchema,
    }).refine((body)=>{
        const start = `1970-01-01T${body.startTime}:00`
        const end = `1970-01-01T${body.endTime}:00`
        return end > start
    },{
        message: 'start time should be before end time!'
    })
})

// update

const updateOfferedCourseValidationSchema = z.object({
    body: z.object({
        faculty: z.string(),
        maxCapacity: z.number(),
        days: z.array(z.enum([...days] as [string, ...string[]])),
        startTime: timeFormatValidationSchema,
        endTime: timeFormatValidationSchema
    }).refine((body)=>{
        const start = `1970-01-01T${body.startTime}:00`
        const end = `1970-01-01T${body.endTime}:00`
        return end > start
    },{
        message: 'start time should be before end time!'
    })
})

export const offeredCourseValidation = {
    createOfferedCourseValidationSchema,
    updateOfferedCourseValidationSchema
}