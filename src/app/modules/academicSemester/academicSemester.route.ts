import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../../midleware/requestValidation';
import { academicSemesterValidation } from './academicSemester.validation';
import auth from '../../midleware/auth';

const router = express.Router();

router.post('/create-academic-semester',auth('admin'),requestValidation(academicSemesterValidation.createAcademicSemesterValidation), academicSemesterController.createAcademicSemester);

router.get('/',auth('admin','faculty'), academicSemesterController.getAllAcademicSemester)

router.get('/:semesterId',auth('admin','faculty'), academicSemesterController.singleAcademicSemester)

router.patch('/:semesterId',auth('admin','faculty'), academicSemesterController.updateAcademicSemester)

export const academicSemesterRoute = router