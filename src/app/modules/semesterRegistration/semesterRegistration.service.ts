import { TSemesterRegistration } from "./semesterRegistration.interface";
import { SemesterRegistration } from "./semesterRegistration.model";

// create semester registration into db
const createSemesterRegistrationIntiDB = async (payload: TSemesterRegistration) =>{
    const result = await SemesterRegistration.create(payload)
    return result
}

// get single semester registration from db
const getSingleSemesterRegistrationFromDB =async (id:string) => {
    const result = await SemesterRegistration.findById(id)
    return result
}

// get all semester registration from db
const getAllSemesterREgistrationFromDB =async () => {
    const result = await SemesterRegistration.find()
    return result
}

// update semester registration into db
const updateSemesterRegistrationIntoDB =async (id: string, payload:Partial<TSemesterRegistration>) => {
    const result = await SemesterRegistration.findByIdAndUpdate(
        id,
        payload
    )
    return result
}

export const constSemesterRegistrationService = {
    createSemesterRegistrationIntiDB,
    getSingleSemesterRegistrationFromDB,
    getAllSemesterREgistrationFromDB,
    updateSemesterRegistrationIntoDB
}