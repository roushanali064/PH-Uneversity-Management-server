import express from 'express'
import requestValidation from '../../midleware/requestValidation';
import { enrolledCourseValidation } from './enrolledCourse.validation';
import { enrolledCourseController } from './enrolledCourse.controller';
import auth from '../../midleware/auth';

const router = express.Router();

router.post(
    '/create-enrolled-course',
    auth('student'),
    requestValidation(
        enrolledCourseValidation.enrolledCourseValidationSchema
    ),
    enrolledCourseController.createEnrolledCourse
)

// update course marks route
router.patch(
    '/update-course-marks',
    auth('faculty'),
    requestValidation(
        enrolledCourseValidation.updateEnrolledCourseMarksValidationSchema
    ),
    enrolledCourseController.updateCourseMarks
)

export const enrolledCourseRoute = router