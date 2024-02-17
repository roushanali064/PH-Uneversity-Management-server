/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found',
    error: '',
  });
};

export default notFoundHandler;
