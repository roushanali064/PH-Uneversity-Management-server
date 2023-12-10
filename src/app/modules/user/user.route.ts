import express from 'express'
import { userController } from './user.controller';
import requestValidation from '../../midleware/requestValidation';
import { studentValidation } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';

const router = express.Router();

// create-student route
router.post('/create-student',requestValidation(studentValidation.CreateStudentValidationSchema),userController.createStudent)

// create-faculty route
router.post('/create-faculty',requestValidation(facultyValidations.createFacultyValidationSchema),userController.createFaculty)

// create-admin route
router.post('/create-admin',requestValidation(adminValidations.createAdminValidationSchema),userController.createAdmin)

export const userRoutes = router;