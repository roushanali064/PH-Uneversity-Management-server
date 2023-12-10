import express from 'express'
import { userController } from './user.controller';
import requestValidation from '../../midleware/requestValidation';
import { studentValidation } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

// create-student route
router.post('/create-student',requestValidation(studentValidation.CreateStudentValidationSchema),userController.createStudent)

// create-faculty route
router.post('/create-faculty',requestValidation(facultyValidations.createFacultyValidationSchema),userController.createFaculty)

export const userRoutes = router;