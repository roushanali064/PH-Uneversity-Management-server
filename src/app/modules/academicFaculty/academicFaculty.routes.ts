import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import requestValidation from '../../midleware/requestValidation';
import { academicFacultyValidation } from './academicFaculty.validation';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// create academic faculty route
router.post(
  '/create-academic-faculty',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

// get all academic faculty route
router.get(
  '/',
  auth(userRole.superAdmin, userRole.admin),
  academicFacultyController.getAllAcademicFaculty,
);

// get single academic faculty
router.get(
  '/:facultyId',
  auth(userRole.superAdmin, userRole.admin),
  academicFacultyController.geaSingleAcademicFaculty,
);

// update academic faculty
router.put(
  '/:facultyId',
  requestValidation(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoute = router;
