import z from 'zod';

const enrolledCourseValidationSchema = z.object({
    body: z.object({
        offeredCourse: z.string({
            required_error: 'offered course is required'
        })
    })
})

export const enrolledCourseValidation = {
    enrolledCourseValidationSchema
}