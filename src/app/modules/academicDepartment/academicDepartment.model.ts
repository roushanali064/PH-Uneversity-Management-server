import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import AppError from "../../error/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: true,
        unique: true
    },
    academicFaculty:{
        type: Schema.Types.ObjectId,
        ref: 'academicFaculty'
    }
},{
    timestamps: true
});

// check the department exist or not
academicDepartmentSchema.pre('save', async function(next){
    const isDepartmentExist = await AcademicDepartment.findOne({
        name: this.name
    })
    
    if(isDepartmentExist){
        throw new AppError(500,`${this.name} is already exits`)
    }

    next()
})

// academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
//     const query = this.getQuery();

//     const isDepartmentExist = await AcademicDepartment.findOne(query);
//     if (!isDepartmentExist) {
//         throw new AppError(404, 'Department does not exist');
//     }
//     next();
        
// });

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment',academicDepartmentSchema)