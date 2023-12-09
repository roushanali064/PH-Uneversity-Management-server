import express from 'express';
import { studentControllers } from './student.controller';
import requestValidation from '../../midleware/requestValidation';
import { studentValidation } from './student.validation';

const router = express.Router();

// all student get route
router.get('/', studentControllers.getAllStudents);

// singe student get route
router.get('/:studentId', studentControllers.getSingleStudent);

// single student update route
router.patch('/:studentId', requestValidation(studentValidation.updateStudentValidationSchema) ,studentControllers.updateStudent);

// delete student route
router.delete('/:studentId', studentControllers.deleteSingleStudent);

export const studentRoute = router;
