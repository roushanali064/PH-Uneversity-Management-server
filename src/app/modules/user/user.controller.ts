import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password, student: studentData } = req.body;
    
      const result = await userService.createStudentIntoDB(password, studentData);
      res.status(200).json({
        success: true,
        message: 'student is create successfully',
        data: result,
      });
    } catch (err) {
      next(err)
    }
  };

export const userController = {
  createStudent
}