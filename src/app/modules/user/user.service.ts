import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password: string ,studentData: TStudent) => {
  
  const user: Partial<TUser> = {}
  user.password = password || (config.default_password) as string;
  user.role = 'student'
  user.id = '2023100001'

    const createUser = await User.create(user);
    // create a student
  if(Object.keys(createUser).length){
    studentData.id = createUser.id;
    studentData.user = createUser._id

    // create student
    const createStudent = await Student.create(studentData);
    return createStudent
  }

    return createUser;
  };

export const userService = {
    createStudentIntoDB
}