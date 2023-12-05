import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

// create academic department in to db
const createAcademicDepartmentInToDB = async (payload: TAcademicDepartment) =>{
    const result = await AcademicDepartment.create(payload);
    return result;
}

// get all academic department
const getAllAcademicDepartmentInToDB = async () =>{
    const result = await AcademicDepartment.find()
    return result
}

// get single academic department
const getSingleAcademicDepartmentInToDB = async (id: string) =>{
    const result = AcademicDepartment.findOne({_id: id});
    return result
}

// update academic department
const updateAcademicDepartmentInToDB =async (id: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.findOneAndUpdate({_id: id},payload,{new: true})
    return result
}

export const academicDepartmentService = {
    createAcademicDepartmentInToDB,
    getAllAcademicDepartmentInToDB,
    getSingleAcademicDepartmentInToDB,
    updateAcademicDepartmentInToDB
}