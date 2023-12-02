import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status';
import { userService } from "./user.service";
import sendResponse from "../../utilitys/sendResponse";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;
    
      const result = await userService.createStudentIntoDB(password, studentData);
      
      sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'student is create successfully',
        data: result
      })
    } catch (err) {
      next(err)
    }
  };

export const userController = {
  createStudent
}