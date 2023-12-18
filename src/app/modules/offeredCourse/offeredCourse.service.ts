import { TOfferedCourse } from "./offeredCourse.interface";
import { OfferedCourseModel } from "./offeredCourse.model";

// create offered course into db
const createOfferedCourseIntoDb = async (payload: TOfferedCourse) =>{
    const result = await OfferedCourseModel.create(payload);
    return result
}

export const offeredCourseService ={
    createOfferedCourseIntoDb
}