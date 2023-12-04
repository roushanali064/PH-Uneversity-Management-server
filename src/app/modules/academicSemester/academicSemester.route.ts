import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../../midleware/requestValidation';
import { academicSemesterValidation } from './academicSemester.validation';

const router = express.Router();

router.post('/create-academic-semester',requestValidation(academicSemesterValidation.createAcademicSemesterValidation), academicSemesterController.createAcademicSemester);

router.get('/', academicSemesterController.getAllAcademicSemester)

router.get('/:semesterId', academicSemesterController.singleAcademicSemester)

router.patch('/:semesterId', academicSemesterController.updateAcademicSemester)

export const academicSemesterRoute = router