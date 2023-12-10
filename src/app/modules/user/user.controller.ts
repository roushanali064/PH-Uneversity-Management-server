import {  Request, Response } from "express";
import httpStatus from 'http-status';
import { userService } from "./user.service";
import sendResponse from "../../utilitys/sendResponse";
import catchAsync from "../../utilitys/catchAsync";

// create student
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

// create student
const createFaculty = catchAsync(async (req: Request, res: Response)=>{
  const {password, faculty} = req.body

  const result = await userService.createFacultyInToDb(password, faculty)

  sendResponse(res,{
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty is create successfully',
    data: result
  })

})

export const userController = {
  createStudent,
  createFaculty
}