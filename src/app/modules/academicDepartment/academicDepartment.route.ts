import express from 'express'
import requestValidation from '../../midleware/requestValidation';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

// academic department create route
router.post('/',academicDepartmentController.createAcademicDepartment)

// all academic department route
router.get('/',academicDepartmentController.AllAcademicDepartment);

// single academic department route
router.get('/:departmentId',academicDepartmentController.singleAcademicDepartment)

// update academic department route
router.put('/:departmentId', academicDepartmentController.updateAcademicDepartment)


export const academicDepartmentRoute = router