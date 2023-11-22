export type UserNAme = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  relation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserNAme;
  gender: 'male' | 'female';
  email: string;
  dateOfBirth?: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  guardian: Guardian;
  bloodGroup: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  localGuardian: LocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'deactivate';
};
