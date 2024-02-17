import express from 'express';
import { FacultyControllers } from './faculty.controller';
import requestValidation from '../../midleware/requestValidation';
import { facultyValidations } from './faculty.validation';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';
const router = express.Router();

router.get(
  '/:id',
  auth(userRole.superAdmin, userRole.admin),
  FacultyControllers.getSingleFaculty,
);

router.patch(
  '/:id',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete(
  '/:id',
  auth(userRole.superAdmin, userRole.admin),
  FacultyControllers.deleteFaculty,
);

router.get(
  '/',
  auth(userRole.admin, userRole.faculty),
  FacultyControllers.getAllFaculties,
);

export const FacultyRoutes = router;
