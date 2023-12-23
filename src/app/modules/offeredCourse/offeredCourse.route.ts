import express from 'express';
import requestValidation from '../../midleware/requestValidation';
import { offeredCourseValidation } from './offeredCourse.validation';
import { offeredCourseController } from './offeredCourse.controller';


const router = express.Router();

// create offered course route
router.post(
    '/create-offered-course', 
    requestValidation(offeredCourseValidation.createOfferedCourseValidationSchema),
    offeredCourseController.createOfferedCourse
)

// get single offered course route
router.get(
    '/:id',
    offeredCourseController.getSingleOfferedCourse
)

// get all offered course route
router.get(
    '/',
    offeredCourseController.getOfferedCourse
)

// update offered course route
router.patch(
    '/:id',
    requestValidation(offeredCourseValidation.updateOfferedCourseValidationSchema),offeredCourseController.updateOfferedCourse
)


export const offeredCourseRoute = router;