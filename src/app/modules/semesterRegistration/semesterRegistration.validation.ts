import z from 'zod';

// create semester registration validation schema
const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        name: z.string()
    })
})

// update semester registration validation schema
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        name: z.string()
    })
})


export const semesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema
}
