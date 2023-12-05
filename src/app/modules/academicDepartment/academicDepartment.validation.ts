import z from 'zod';

// academic department validation
const createAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'name is must be a string',
            required_error: 'name is required'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty is must ba a string',
            required_error: 'name is required'
        })
    })
});

const updateAcademicDepartmentValidation = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: 'name is must be a string',
            required_error: 'name is required'
        }),
        academicFaculty: z.string({
            invalid_type_error: 'Academic faculty is must ba a string',
            required_error: 'name is required'
        })
    })
});

export const academicDepartmentValidation = {
    createAcademicDepartmentValidation,
    updateAcademicDepartmentValidation
}