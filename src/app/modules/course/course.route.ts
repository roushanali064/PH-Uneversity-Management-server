import express from 'express'
import requestValidation from '../../midleware/requestValidation';
import { courseValidationSchema } from './course.validation';
import { courseController } from './course.controller';

const router = express.Router();

// create course route
router.post('/create-course',requestValidation(courseValidationSchema.createCourseValidationSchema),courseController.createCourse)

// get all course route
router.get('/',courseController.getAllCourses)

// get single course
router.get('/:courseId', courseController.getSingleCourse)

// update course
router.patch('/:courseId', requestValidation(courseValidationSchema.updateCourseValidationSchema), courseController.updateCourse)

// assign faculties
router.put('/:courseId/assign-faculties', requestValidation(courseValidationSchema.assignFacultiesWithCourseValidationSchema) , courseController.assignFaculties)

// remove faculties
router.delete('/:courseId/remove-faculties', requestValidation(courseValidationSchema.assignFacultiesWithCourseValidationSchema) , courseController.removeFaculties)

// delete  course
router.delete('/:courseId', courseController.deleteSingleCourse)

export const coursesRoute = router