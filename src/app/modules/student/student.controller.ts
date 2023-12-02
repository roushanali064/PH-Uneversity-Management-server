import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { studentServices } from './student.service';
import sendResponse from '../../utilitys/sendResponse';

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'student are retrieve successfully',
      data: result
    })
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentId);
    
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'student are retrieve successfully',
      data: result
    })
  } catch (err) {
    next(err)
  }
};

const deleteSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await studentServices.deleteSingleStudentsFromDB(studentId);
    
    sendResponse(res,{
      statusCode: httpStatus.OK,
      success: true,
      message: 'student is deleted successfully',
      data: result
    })

  } catch (err) {
    next(err)
  }
};

export const studentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteSingleStudent
};
