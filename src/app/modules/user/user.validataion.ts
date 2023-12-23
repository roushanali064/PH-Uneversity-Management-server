import z from 'zod'
import { status } from './user.constant'
const userValidationSchema = z.object({
    password: z.string({
        invalid_type_error: 'password must be string'
    }).max(20,{message:'password cant not be more than 20 characters'}).optional(),
})

// status change validation
const statusChanged = z.object({
    body: z.object({
        status: z.enum([...status] as [string, ...[]])
    })
})

export const userValidation = {
    userValidationSchema,
    statusChanged
}