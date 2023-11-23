import { Request, Response } from 'express';
import { studentServices } from './student.service';
// import JoiStudentValidationSchema from './student.JoiValidation';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // joi validation
    // const {error, value} = JoiStudentValidationSchema.validate(studentData)

    // if(error){
    //   res.status(500).json({
    //     success: false,
    //     message: 'something went wrong',
    //     error: error?.details,
    //   });
    // }else{
    //   const result = await studentServices.createStudentIntoDB(value);
    //   res.status(200).json({
    //     success: true,
    //     message: 'student is create successfully',
    //     data: result,
    //   });
    // }
    // zod validation
    const zodParseData = studentValidationSchema.parse(studentData);
    const result = await studentServices.createStudentIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: 'student is create successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'student are retrieve successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student is retrieve successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
