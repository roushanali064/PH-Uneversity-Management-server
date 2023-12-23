import express from 'express'
import { userController } from './user.controller';
import requestValidation from '../../midleware/requestValidation';
import { studentValidation } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';
import { adminValidations } from '../admin/admin.validation';
import auth from '../../midleware/auth';
import { userRole } from './user.constant';
import { userValidation } from './user.validataion';

const router = express.Router();

// create-student route
router.post(
    '/create-student',
    auth(userRole.admin),
    requestValidation(studentValidation.CreateStudentValidationSchema),
    userController.createStudent
)

// create-faculty route
router.post('/create-faculty',requestValidation(facultyValidations.createFacultyValidationSchema),userController.createFaculty)

// create-admin route
router.post('/create-admin',requestValidation(adminValidations.createAdminValidationSchema),userController.createAdmin)

// create-admin route
router.get('/me',auth('student','admin','faculty'),userController.getMe)

// change status route
router.put('/change-status/:id',auth('admin'),requestValidation(userValidation.statusChanged),userController.changeStatus)

export const userRoutes = router;