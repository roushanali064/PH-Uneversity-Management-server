import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { offeredCourseService } from './offeredCourse.service';

// create course
const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.createOfferedCourseIntoDb(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'offered course created successfully',
    data: result,
  });
});

// get single offered course
const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.getSingleOfferedCourseFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered course retrieved successfully',
    data: result,
  });
});

// get  offered course
const getOfferedCourse = catchAsync(async (req, res) => {
  const result = await offeredCourseService.getOfferedCourseFromDb();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered course retrieved successfully',
    data: result,
  });
});

// update offered course
const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await offeredCourseService.updateOfferedCourseFromDB(
    id,
    req.body,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'offered course update successfully',
    data: result,
  });
});

export const offeredCourseController = {
  createOfferedCourse,
  getSingleOfferedCourse,
  getOfferedCourse,
  updateOfferedCourse,
};
