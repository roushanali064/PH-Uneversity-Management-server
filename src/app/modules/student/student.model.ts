import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserNAme,
} from './student.interface';

const userNAmeSchema = new Schema<UserNAme>({
  firstName: {
    type: String,
    required: true,
    message: 'First name is required',
  },
  middleName: { 
    type: String, 
    trim: true,
    maxlength: [30, 'First name can not be more than 30 character'] 
  },
  lastName: { 
    type: String, 
    required: true, 
    message: 'Last name is required',
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: {
    type: String,
    required: true,
    message: 'Father name is required',
    trim: true,
    maxlength: [30, 'First name can not be more than 30 character'],
    
  },
  fatherOccupation: {
    type: String,
    required: true,
    message: 'Father occupation is required',
  },
  fatherContactNo: {
    type: String,
    required: true,
    message: 'Father contact number is required',
  },
  motherName: {
    type: String,
    required: true,
    message: 'Mother name is required',
  },
  motherOccupation: {
    type: String,
    required: true,
    message: 'Mother occupation is required',
  },
  motherContactNo: {
    type: String,
    required: true,
    message: 'Mother contact number is required',
  },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: {
    type: String,
    required: true,
    message: 'Local guardian name is required',
  },
  relation: {
    type: String,
    required: true,
    message: 'Relation with local guardian is required',
  },
  contactNo: {
    type: String,
    required: true,
    message: 'Local guardian contact number is required',
  },
  address: {
    type: String,
    required: true,
    message: 'Local guardian address is required',
  },
});

const studentSchema = new Schema<Student>({
  id: {
    type: String,
    required: true,
    unique: true,
    message: 'Student ID is required and must be unique',
  },
  name: {
    type: userNAmeSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'others'],
    required: true,
    message: 'Gender must be one of: male, female, others',
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    message: 'Email is required',
  },
  dateOfBirth: { type: String },
  contactNo: {
    type: String,
    required: true,
    message: 'Contact number is required',
  },
  emergencyContactNo: {
    type: String,
    required: true,
    message: 'Emergency contact number is required',
  },
  presentAddress: {
    type: String,
    required: true,
    message: 'Present address is required',
  },
  permanentAddress: {
    type: String,
    required: true,
    message: 'Permanent address is required',
  },
  guardian: {
    type: guardianSchema,
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: true,
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ['active', 'deactivate'],
    default: 'active',
    message: 'Status must be one of: active, deactivate',
  },
});

// make modal

export const StudentModel = model<Student>('Student', studentSchema);
