import httpStatus from "http-status";
import catchAsync from "../../utilitys/catchAsync";
import sendResponse from "../../utilitys/sendResponse";
import { academicFacultyServices } from "./academicFaculty.services";

// create academic faculty
const createAcademicFaculty = catchAsync(async (req, res)=>{

    const result = await academicFacultyServices.createAcademicFacultyInToDB(req.body)
    
    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: "academic faculty is create successfully",
        data: result
    })
})

// get academic faculty
const getAllAcademicFaculty = catchAsync(async (req,res)=>{
    const result = await academicFacultyServices.getAllAcademicFacultyFromDb()

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'all academic faculty retrieve successfully',
        data: result
    })
})

// get single academic faculty 
const geaSingleAcademicFaculty = catchAsync(async (req,res)=>{
    
    const {facultyId} = req.params

    const result = await academicFacultyServices.singleAcademicFacultyFromDb(facultyId)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic faculty retrieve successFully',
        data: result
    })
});

// update academic faculty
const updateAcademicFaculty = catchAsync(async (req,res)=>{
    const {facultyId} = req.params;

    const result = await academicFacultyServices.updateAcademicFacultyFromDB(facultyId,req.body)

    sendResponse(res,{
        statusCode: httpStatus.OK,
        success: true,
        message: 'academic faculty update successfully',
        data: result
    })
})


export const academicFacultyController = {
    createAcademicFaculty,
    getAllAcademicFaculty,
    geaSingleAcademicFaculty,
    updateAcademicFaculty
}