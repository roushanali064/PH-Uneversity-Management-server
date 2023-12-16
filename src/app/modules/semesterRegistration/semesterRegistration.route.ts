import express from 'express';
import { semesterRegistrationController } from './semesterRegistration.controller';
import requestValidation from '../../midleware/requestValidation';
import { semesterRegistrationValidation } from './semesterRegistration.validation';

const router = express.Router();

// create semester registration route
router.post(
    '/create-semester-registration',
    requestValidation(semesterRegistrationValidation.createSemesterRegistrationValidationSchema),
    semesterRegistrationController.createSemesterRegistration
)

// get single semester registration route
router.get(
    '/:id',
    semesterRegistrationController.getSingleSemesterRegistration
)

// get all semester registration route
router.get(
    '/',
    semesterRegistrationController.getAllSemesterRegistration
)

// update semester registration route
router.patch(
    '/:id',
    requestValidation(semesterRegistrationValidation.updateSemesterRegistrationValidationSchema),
    semesterRegistrationController.updateSingleSemesterRegistration
)


export const semesterRegistrationRoute = router;