import { Router } from "express";
import { studentRoute } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";
import { academicSemesterRoute } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoute } from "../modules/academicFaculty/academicFaculty.routes";
import { academicDepartmentRoute } from "../modules/academicDepartment/academicDepartment.route";

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
    },
    {
        path: '/academic-department',
        route: academicDepartmentRoute
    }
 ]

 moduleRoutes.forEach(route=> router.use(route.path, route.route))
 
 export default router