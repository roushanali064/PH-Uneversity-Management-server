import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { enrolledCourseService } from "./enrolledCourse.service";

const createEnrolledCourse = catchAsync(async (req,res)=>{
    const {userId} = req.user;
    const result = await enrolledCourseService.createEnrolledCourseInToDB(userId,req.body)

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'enrolled successfully',
        data: result
    })
})

// update course marks
const updateCourseMarks = catchAsync(async (req,res)=>{
    const {userId} = req.user;
    const result = await enrolledCourseService.updateCourseMarksInToDB(userId,req.body)

    sendResponse(res,{
        statusCode: httpStatus.CREATED,
        success: true,
        message: 'course MArks update successFully',
        data: result
    })
})

export const enrolledCourseController = {
    createEnrolledCourse,
    updateCourseMarks
}