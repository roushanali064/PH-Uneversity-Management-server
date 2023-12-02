import { Router } from "express";
import { studentRoute } from "../modules/student/student.route";
import { userRoutes } from "../modules/user/user.route";

 const router = Router()

 const moduleRoutes = [
    {
        path: '/users',
        route: userRoutes
    },
    {
        path: '/students',
        route: studentRoute
    }
 ]

 moduleRoutes.forEach(route=> router.use(route.path, route.route))
 
 export default router