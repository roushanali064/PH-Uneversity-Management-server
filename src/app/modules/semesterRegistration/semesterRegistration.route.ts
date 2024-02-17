import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import requestValidation from '../../midleware/requestValidation';
import { semesterRegistrationValidation } from './semesterRegistration.validation';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// create semester registration route
router.post(
  '/create-semester-registration',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    semesterRegistrationValidation.createSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.createSemesterRegistration,
);

// get single semester registration route
router.get(
  '/:id',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  semesterRegistrationController.getSingleSemesterRegistration,
);

// get all semester registration route
router.get(
  '/',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  semesterRegistrationController.getAllSemesterRegistration,
);

// update semester registration route
router.patch(
  '/:id',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    semesterRegistrationValidation.updateSemesterRegistrationValidationSchema,
  ),
  semesterRegistrationController.updateSingleSemesterRegistration,
);

export const semesterRegistrationRoute = router;
