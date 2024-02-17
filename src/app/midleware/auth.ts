import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../error/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // check token is given or not
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    // validate token
    // decoded
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (err) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    const { role, userId, iat } = decoded;

    // checking is the user is exits
    const user = await User.isUserExistsByCustomID(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user not exits');
    }

    // check is user delete
    const isUserDeleted = user?.isDeleted;
    if (isUserDeleted) {
      throw new AppError(httpStatus.NOT_FOUND, 'this user not exits');
    }

    // check is user blocked
    const userStatus = user?.status;
    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.NOT_FOUND, 'this user blocked');
    }

    if (
      user.passwordChangeTime &&
      User.isJWTIssuedBeforePasswordChange(
        user.passwordChangeTime,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
