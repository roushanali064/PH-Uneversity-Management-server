import {  Request, Response } from "express";
import httpStatus from 'http-status';
import { userService } from "./user.service";
import sendResponse from "../../utilitys/sendResponse";
import catchAsync from "../../utilitys/catchAsync";

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDB(password, studentData);
  
  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is create successfully',
    data: result
  })
});

export const userController = {
  createStudent
}