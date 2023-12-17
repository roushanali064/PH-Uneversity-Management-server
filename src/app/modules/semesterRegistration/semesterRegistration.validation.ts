import z from 'zod';
import { semesterRegistrationStatus } from './semesterRegistration.conostant';

// create semester registration validation schema
const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        name: z.string()
    })
})

// update semester registration validation schema
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z.enum([...semesterRegistrationStatus] as [string, ...string[]]),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number()
    })
})


export const semesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}
