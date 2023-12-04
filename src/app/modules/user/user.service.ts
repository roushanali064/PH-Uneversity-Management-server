import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import {  TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utitly";

const createStudentIntoDB = async (password: string ,payload: TStudent) => {
  
  const user: Partial<TUser> = {}
  // set default password
  user.password = password || (config.default_password) as string;
  user.role = 'student'

  // find academic semester data
  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  // set user id
  user.id = await generateStudentId(admissionSemester)

  // create user
  const createUser = await User.create(user);

  // create a student
  if(Object.keys(createUser).length){
    payload.id = createUser.id;
    payload.user = createUser._id

    // create student
    const createStudent = await Student.create(payload);
    return createStudent
  }

    return createUser;
  };

export const userService = {
    createStudentIntoDB
}