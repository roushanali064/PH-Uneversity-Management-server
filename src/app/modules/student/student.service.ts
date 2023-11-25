import { TStudent } from './student.interface';
import { Student } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await Student.create(student);//builtin static method
  // return result;

  const student = new Student(studentData); //create new student
  if(await student.isUserExists(studentData.id)){
    throw new Error('user already exists')
  }
  const result = student.save();//builtin instance method
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentsFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

const deleteSingleStudentsFromDB = async (id: string) => {
  const result = await Student.updateOne({ id },{isDeleted: true});
  return result;
};

export const studentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  deleteSingleStudentsFromDB
};
