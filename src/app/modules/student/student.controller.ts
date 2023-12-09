import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { studentServices } from './student.service';
import sendResponse from '../../utilitys/sendResponse';
import catchAsync from '../../utilitys/catchAsync';

// get all student
const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  
  const result = await studentServices.getAllStudentsFromDB(req.query);

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'student are retrieve successfully',
    data: result
  })
});

// get single student
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await studentServices.getSingleStudentsFromDB(studentId);
  
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'student are retrieve successfully',
    data: result
  })
});

// update student
const updateStudent = catchAsync(async (req: Request, res: Response)=>{
  const {studentId} = req.params;
  const {student} = req.body;
  const result = await studentServices.updateStudentInToDb(studentId,student)

  // send response
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is update successfully',
    data: result
  })

})

// delete student
const deleteSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const { studentId } = req.params;
  const result = await studentServices.deleteSingleStudentsFromDB(studentId);
  
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is deleted successfully',
    data: result
  })
});

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent,
  updateStudent
};
