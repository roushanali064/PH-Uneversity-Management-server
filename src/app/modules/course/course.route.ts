import express from 'express';
import requestValidation from '../../midleware/requestValidation';
import { courseValidationSchema } from './course.validation';
import { courseController } from './course.controller';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

// create course route
router.post(
  '/create-course',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(courseValidationSchema.createCourseValidationSchema),
  courseController.createCourse,
);

// get all course route
router.get(
  '/',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  courseController.getAllCourses,
);

// get single course
router.get(
  '/:courseId',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  courseController.getSingleCourse,
);

// update course
router.patch(
  '/:courseId',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(courseValidationSchema.updateCourseValidationSchema),
  courseController.updateCourse,
);

// assign faculties
router.put(
  '/:courseId/assign-faculties',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    courseValidationSchema.assignFacultiesWithCourseValidationSchema,
  ),
  courseController.assignFaculties,
);

// get faculties
router.get(
  '/:courseId/get-faculties',
  auth(userRole.superAdmin, userRole.admin, userRole.faculty, userRole.student),
  courseController.getCourseFaculty,
);

// remove faculties
router.delete(
  '/:courseId/remove-faculties',
  auth(userRole.superAdmin, userRole.admin),
  requestValidation(
    courseValidationSchema.assignFacultiesWithCourseValidationSchema,
  ),
  courseController.removeFaculties,
);

// delete  course
router.delete(
  '/:courseId',
  auth(userRole.superAdmin, userRole.admin),
  courseController.deleteSingleCourse,
);

export const coursesRoute = router;
