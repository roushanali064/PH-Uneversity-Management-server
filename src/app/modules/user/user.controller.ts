import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

// create student
const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { password, student: studentData } = req.body;

  const result = await userService.createStudentIntoDB(req.file,password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'student is create successfully',
    data: result,
  });
});

// create student
const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { password, faculty } = req.body;

  const result = await userService.createFacultyInToDb(password, faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty is create successfully',
    data: result,
  });
});

// create admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const { password, admin } = req.body;

  const result = await userService.createAdminInToDb(password, admin);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'admin is create successfully',
    data: result,
  });
});

// get me
const getMe = catchAsync(async (req: Request, res: Response) => {

  const {userId, role} = req.user

  const result = await userService.getMeIntoDB(userId, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'user retrieved successfully',
    data: result,
  });
});

// change status
const changeStatus = catchAsync(async (req, res)=>{
  const {status} = req.body
  const {id} = req.params;
  
  const result = await userService.changeStatusFromDb(status, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'status changed successfully',
    data: result,
  });
})

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus
};
