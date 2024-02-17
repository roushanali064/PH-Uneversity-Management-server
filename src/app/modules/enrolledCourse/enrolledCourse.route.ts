import express from 'express';
import requestValidation from '../../midleware/requestValidation';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import { enrolledCourseController } from './enrolledCourse.controller';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth(userRole.student),
  requestValidation(enrolledCourseValidation.enrolledCourseValidationSchema),
  enrolledCourseController.createEnrolledCourse,
);

router.get(
  '/my-enrolled-courses',
  auth(userRole.student),
  enrolledCourseController.myEnrolledCourses,
);

// update course marks route
router.patch(
  '/update-course-marks',
  auth(userRole.student, userRole.admin, userRole.faculty, userRole.superAdmin),
  requestValidation(
    enrolledCourseValidation.updateEnrolledCourseMarksValidationSchema,
  ),
  enrolledCourseController.updateCourseMarks,
);

export const enrolledCourseRoute = router;
