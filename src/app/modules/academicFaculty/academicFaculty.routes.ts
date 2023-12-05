import express from 'express'
import { academicFacultyController } from './academicFaculty.controller';
import requestValidation from '../../midleware/requestValidation';
import { academicFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

// create academic faculty route
router.post('/create-academic-faculty',requestValidation(academicFacultyValidation.academicFacultyValidationSchema),academicFacultyController.createAcademicFaculty)

// get all academic faculty route
router.get('/academic-faculty',academicFacultyController.getAllAcademicFaculty)

// get single academic faculty
router.get('/academic-faculty/:facultyId', academicFacultyController.geaSingleAcademicFaculty)

// update academic faculty
router.put('/academic-faculty/:facultyId',requestValidation(academicFacultyValidation.academicFacultyValidationSchema), academicFacultyController.updateAcademicFaculty)

export const academicFacultyRoute = router