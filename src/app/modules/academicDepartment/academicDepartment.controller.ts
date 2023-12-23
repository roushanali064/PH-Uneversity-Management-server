import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { academicDepartmentService } from './academicDepartment.service';

// create academic department
const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createAcademicDepartmentInToDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department create successful',
    data: result,
  });
});

// get all academic department
const AllAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getAllAcademicDepartmentInToDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'all academic department retrieve successful',
    data: result,
  });
});

// get single academic department
const singleAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentInToDB(
      departmentId,
    );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department retrieve successful',
    data: result,
  });
});

// update academic department
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = academicDepartmentService.updateAcademicDepartmentInToDB(
    departmentId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department update successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  AllAcademicDepartment,
  singleAcademicDepartment,
  updateAcademicDepartment,
};
