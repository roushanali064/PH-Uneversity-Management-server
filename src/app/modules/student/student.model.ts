import { Schema, model } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserNAme,
} from './student.interface';

const userNAmeSchema = new Schema<UserNAme>({
  firstName: { type: String, required: true },
  middleName: { type: String },
  lastName: { type: String, required: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { type: String, required: true },
  relation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNAmeSchema,
  gender: ['male', 'female'],
  email: { type: String, required: true },
  dateOfBirth: { type: String },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'deactivate'],
});

// make modal

export const StudentModel = model<Student>('Student', studentSchema);
