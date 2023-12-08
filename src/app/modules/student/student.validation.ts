import { z } from 'zod';

// Define zod schema for userNAme
const userNAmeValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name is required' })
    .max(30, { message: 'First name can not be more than 30 characters' }),
  middleName: z
    .string()
    .max(30, { message: 'Middle name can not be more than 30 characters' })
    .optional(),
  lastName: z
    .string()
    .min(1, { message: 'Last name is required' })
    .max(30, { message: 'Last name can not be more than 30 characters' }),
});

// Define zod schema for guardian
const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .min(1, { message: 'Father name is required' })
    .max(30, { message: 'Father name can not be more than 30 characters' }),
  fatherOccupation: z
    .string()
    .min(1, { message: 'Father occupation is required' }),
  fatherContactNo: z
    .string()
    .min(1, { message: 'Father contact number is required' }),
  motherName: z.string().min(1, { message: 'Mother name is required' }),
  motherOccupation: z
    .string()
    .min(1, { message: 'Mother occupation is required' }),
  motherContactNo: z
    .string()
    .min(1, { message: 'Mother contact number is required' }),
});

// Define zod schema for localGuardian
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, { message: 'Local guardian name is required' }),
  relation: z
    .string()
    .min(1, { message: 'Relation with local guardian is required' }),
  contactNo: z
    .string()
    .min(1, { message: 'Local guardian contact number is required' }),
  address: z.string().min(1, { message: 'Local guardian address is required' }),
});

// Define zod schema for student
const CreateStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNAmeValidationSchema,
      gender: z.enum(['male', 'female', 'others']),
      email: z.string().email({ message: 'Email is required' }),
      dateOfBirth: z.string().optional(),
      contactNo: z.string().min(1, { message: 'Contact number is required' }),
      emergencyContactNo: z
        .string()
        .min(1, { message: 'Emergency contact number is required' }),
      presentAddress: z.string().min(1, { message: 'Present address is required' }),
      permanentAddress: z
        .string()
        .min(1, { message: 'Permanent address is required' }),
      guardian: guardianValidationSchema,
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      localGuardian: localGuardianValidationSchema,
      academicDepartment: z.string(),
      admissionSemester: z.string(),
      profileImg: z.string().optional(),
    })
  })
});

export const studentValidation = {
  CreateStudentValidationSchema
};
