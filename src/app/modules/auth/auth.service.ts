import httpStatus from 'http-status';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { TLogin } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import bcrypt from 'bcrypt';
import { createJwtToken, verifyJwtToken } from './auth.utils';
import { sendEmail } from '../../utils/sendEmail';

const loginFromDb = async (payload: TLogin) => {
  // checking is the user is exits
  const user = await User.isUserExistsByCustomID(payload.id);
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

  // check password
  if (!(await User.isPasswordCheck(payload.password, user.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'password not match');
  }

  // access token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_Token_expire as string,
  );

  const refreshToken = createJwtToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.refresh_Token_expire as string,
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  // checking is the user is exits
  const user = await User.isUserExistsByCustomID(userData.userId);
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

  // check password
  if (!(await User.isPasswordCheck(payload.oldPassword, user?.password))) {
    throw new AppError(httpStatus.NOT_FOUND, 'password not match');
  }

  // hash password
  const hashPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: userData.userId,
      role: userData.role,
    },
    {
      password: hashPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    },
  );
  return null;
};

const refreshToken = async (token: string) => {
  // decoded
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { userId, iat } = decoded;

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
    User.isJWTIssuedBeforePasswordChange(user.passwordChangeTime, iat as number)
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
  }

  // access token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const accessToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.access_Token_expire as string,
  );

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

// forget password
const forgetPasswordIntoDB = async (userId: string) => {
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

  // access token
  const jwtPayload = {
    userId: user?.id,
    role: user?.role,
  };
  const resetToken = createJwtToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );
  const resetUILink = `${config.reset_password_ui_link}?id=${user.id}&token=${resetToken}`;

  // password reset email body
  const passwordResetHTML = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            text-align: center;
        }

        .container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        h1 {
            color: #333333;
        }

        p {
            color: #666666;
        }

        .button {
            display: inline-block;
            font-size: 16px;
            padding: 10px 20px;
            text-decoration: none;
            background-color: #4caf50;
            color: #ffffff;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>

<body>
    <div class="container">
        <h1>Password Reset</h1>
        <p>Dear user,</p>
        <p>We received a request to reset your password for PH-University account. To proceed, click the button below:</p>

        <a class="button" href="${resetUILink}">Reset Password</a>

        <p>If you did not request a password reset, please ignore this email.</p>

        <p>Best regards,<br>PH-University Team</p>
    </div>
</body>

    </html>`;

  sendEmail(user?.email, passwordResetHTML);
};

// reset password
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  // checking is the user is exits
  const user = await User.isUserExistsByCustomID(payload?.id);
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

  const decoded = verifyJwtToken(token, config.jwt_access_secret as string);

  if (decoded?.userId !== user?.id) {
    throw new AppError(httpStatus.FORBIDDEN, 'you are not authorized');
  }

  // hash password
  const hashPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_round),
  );

  await User.findOneAndUpdate(
    {
      id: user?.id,
      role: user?.role,
    },
    {
      password: hashPassword,
      needsPasswordChange: false,
      passwordChangeTime: new Date(),
    },
  );
};

export const authService = {
  loginFromDb,
  changePassword,
  refreshToken,
  forgetPasswordIntoDB,
  resetPassword,
};
