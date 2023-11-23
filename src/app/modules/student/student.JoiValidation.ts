import Joi from 'joi';

const userNAmeJoiSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .messages({
      'any.required': 'First name is required',
    })
    .trim()
    .max(30)
    .messages({
      'string.max': 'First name can not be more than 30 characters',
    }),
  middleName: Joi.string().trim().max(30),
  lastName: Joi.string()
    .required()
    .messages({
      'any.required': 'Last name is required',
    })
    .trim()
    .max(30)
    .messages({
      'string.max': 'Last name can not be more than 30 characters',
    }),
});

// Define Joi schema for guardian
const guardianJoiSchema = Joi.object({
  fatherName: Joi.string()
    .required()
    .messages({
      'any.required': 'Father name is required',
    })
    .trim()
    .max(30)
    .messages({
      'string.max': 'Father name can not be more than 30 characters',
    }),
  fatherOccupation: Joi.string().required().messages({
    'any.required': 'Father occupation is required',
  }),
  fatherContactNo: Joi.string().required().messages({
    'any.required': 'Father contact number is required',
  }),
  motherName: Joi.string().required().messages({
    'any.required': 'Mother name is required',
  }),
  motherOccupation: Joi.string().required().messages({
    'any.required': 'Mother occupation is required',
  }),
  motherContactNo: Joi.string().required().messages({
    'any.required': 'Mother contact number is required',
  }),
});

// Define Joi schema for localGuardian
const localGuardianJoiSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'Local guardian name is required',
  }),
  relation: Joi.string().required().messages({
    'any.required': 'Relation with local guardian is required',
  }),
  contactNo: Joi.string().required().messages({
    'any.required': 'Local guardian contact number is required',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Local guardian address is required',
  }),
});

// Define Joi schema for student
const JoiStudentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'any.required': 'Student ID is required and must be unique',
  }),
  name: userNAmeJoiSchema.required(),
  gender: Joi.string().valid('male', 'female', 'others').required().messages({
    'any.only': 'Gender must be one of: male, female, others',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'Email is required',
    'string.email': 'Email must be a valid email',
  }),
  dateOfBirth: Joi.string(),
  contactNo: Joi.string().required().messages({
    'any.required': 'Contact number is required',
  }),
  emergencyContactNo: Joi.string().required().messages({
    'any.required': 'Emergency contact number is required',
  }),
  presentAddress: Joi.string().required().messages({
    'any.required': 'Present address is required',
  }),
  permanentAddress: Joi.string().required().messages({
    'any.required': 'Permanent address is required',
  }),
  guardian: guardianJoiSchema.required(),
  bloodGroup: Joi.string().valid(
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ),
  localGuardian: localGuardianJoiSchema.required(),
  profileImg: Joi.string(),
  isActive: Joi.string()
    .valid('active', 'deactivate')
    .default('active')
    .messages({
      'any.only': 'Status must be one of: active, deactivate',
    }),
});

export default JoiStudentValidationSchema;
