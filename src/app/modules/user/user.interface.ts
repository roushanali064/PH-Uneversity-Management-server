/* eslint-disable no-unused-vars */
import { Date, Model } from 'mongoose';
import { userRole } from './user.constant';

export interface TUser {
  id: string;
  email: string;
  password: string;
  passwordChangeTime?: Date;
  needsPasswordChange: boolean;
  role: 'superAdmin' | 'admin' | 'student' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
}

export type TUserRole = keyof typeof userRole;

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomID(id: string): Promise<TUser>;
  isPasswordCheck(planeText: string, password: string): boolean;
  isJWTIssuedBeforePasswordChange(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean;
}
