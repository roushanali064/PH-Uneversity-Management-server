import { Model, Types } from 'mongoose';

export type TUserNAme = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TLocalGuardian = {
  name: string;
  relation: string;
  contactNo: string;
  address: string;
};

export type TStudent = {
  id: string;
  user: Types.ObjectId
  name: TUserNAme;
  gender: 'male' | 'female' | 'others';
  email: string;
  dateOfBirth?: Date;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  localGuardian: TLocalGuardian;
  admissionSemester: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImg?: string;
  isDeleted: true | false
};

export type StudentMethods = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>;
};

export type StudentModel = Model<TStudent,Record<string, never>,StudentMethods>;
