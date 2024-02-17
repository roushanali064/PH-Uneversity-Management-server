import express from 'express';
import requestValidation from '../../midleware/requestValidation';
import { offeredCourseValidation } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// create offered course route
router.post(
  '/create-offered-course',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    offeredCourseValidation.createOfferedCourseValidationSchema,
  ),
  offeredCourseController.createOfferedCourse,
);

// get my offered course route
router.get(
  '/my-offered-course',
  auth(userRole.student),
  offeredCourseController.getMyOfferedCourse,
);

// get single offered course route
router.get(
  '/:id',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  offeredCourseController.getSingleOfferedCourse,
);

// get all offered course route
router.get(
  '/',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty),
  offeredCourseController.getOfferedCourse,
);

// update offered course route
router.patch(
  '/:id',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    offeredCourseValidation.updateOfferedCourseValidationSchema,
  ),
  offeredCourseController.updateOfferedCourse,
);

export const offeredCourseRoute = router;
