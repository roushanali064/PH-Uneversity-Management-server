import { Router } from "express";
import { studentRoute } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.routes";

 const router = Router()

 const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/students',
        route: studentRoute
    },
    {
        path: '/academic-semester',
        route: academicSemesterRoute
    },
    {
        path: '/academic-faculties',
        route: academicFacultyRoute
    }
 ]

 moduleRoutes.forEach(route=> router.use(route.path, route.route))
 
 export default router