import express from 'express';
import { academicSemesterController } from './academicSemester.controller';
import requestValidation from '../../midleware/requestValidation';
import { academicSemesterValidation } from './academicSemester.validation';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    academicSemesterValidation.createAcademicSemesterValidation,
  ),
  academicSemesterController.createAcademicSemester,
);

router.get(
  '/',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty),
  academicSemesterController.getAllAcademicSemester,
);

router.get(
  '/:semesterId',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty),
  academicSemesterController.singleAcademicSemester,
);

router.patch(
  '/:semesterId',
  auth(userRole.superAdmin, userRole.admin),
  academicSemesterController.updateAcademicSemester,
);

export const academicSemesterRoute = router;
