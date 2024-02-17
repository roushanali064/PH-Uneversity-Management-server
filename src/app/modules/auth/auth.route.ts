import express from 'express';
import requestValidation from '../../midleware/requestValidation';
import { authValidation } from './auth.validation';
import { authController } from './auth.controller';
import auth from '../../midleware/auth';
import { userRole } from '../user/user.constant';

const router = express.Router();

router.post(
  '/login',
  requestValidation(authValidation.loginValidationSchema),
  authController.login,
);

router.post(
  '/change-password',
  auth(userRole.admin, userRole.faculty, userRole.student, userRole.superAdmin),
  requestValidation(authValidation.passwordChangeValidationSchema),
  authController.changePassword,
);

router.post(
  '/refresh-token',
  requestValidation(authValidation.refreshTokenValidationSchema),
  authController.refreshToken,
);

router.post(
  '/forget-password',
  requestValidation(authValidation.forgetPasswordValidationSchema),
  authController.forgetPassword,
);

// reset password
router.post(
  '/reset-password',
  requestValidation(authValidation.resetPasswordValidationSchema),
  authController.resetPassword,
);

export const authRoute = router;
