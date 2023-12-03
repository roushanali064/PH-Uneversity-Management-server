import express from 'express'
import { userController } from './user.controller';
import requestValidation from '../../midleware/requestValidation';
import { studentValidation } from '../student/student.validation';

const router = express.Router();

router.post('/create-student',requestValidation(studentValidation.CreateStudentValidationSchema),userController.createStudent)

export const userRoutes = router;