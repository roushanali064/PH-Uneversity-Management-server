import httpStatus from "http-status"
import catchAsync from "../../utilitys/catchAsync"
import sendResponse from "../../utilitys/sendResponse"
import { courseService } from "./course.service"

// create course
const createCourse = catchAsync(async (req, res)=>{

    const result = await courseService.createCourseIntoDb(req.body)
    
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "course is create successfully",
        data: result
    })
})

// get courses
const getAllCourses = catchAsync(async (req,res)=>{
    const result = await courseService.getAllCourseInToDB(req.query)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all courses retrieve successfully',
        data: result
    })
})

// get single courses
const getSingleCourse = catchAsync(async (req,res)=>{
    
    const {courseId} = req.params

    const result = await courseService.getSingleCourseInToDB(courseId)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'course retrieve successFully',
        data: result
    })
});

// get single courses
const deleteSingleCourse = catchAsync(async (req,res)=>{
    
    const {courseId} = req.params

    const result = await courseService.deleteCourseFromToDB(courseId)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'course delete successFully',
        data: result
    })
});

// update academic faculty
const updateCourse = catchAsync(async (req,res)=>{
    const {courseId} = req.params;

    const result = await courseService.updateCourseIntoDB(courseId,req.body)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'course update successfully',
        data: result
    })
})

// assign faculties
const assignFaculties = catchAsync(async (req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body

    const result = await courseService.assignFacultiesIntoDB(courseId, faculties)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculties assign successfully',
        data: result
    })
})

// remove faculties
const removeFaculties = catchAsync(async (req,res)=>{
    const {courseId} = req.params;
    const {faculties} = req.body

    const result = await courseService.removeFacultiesIntoDB(courseId, faculties)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'faculties remove successfully',
        data: result
    })
})

export const courseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateCourse,
    deleteSingleCourse,
    assignFaculties,
    removeFaculties
}