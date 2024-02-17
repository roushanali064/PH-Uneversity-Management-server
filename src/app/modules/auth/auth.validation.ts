import z from 'zod';
const loginValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required',
    }),
    password: z.string({
      required_error: 'password is required',
    }),
  }),
});

const passwordChangeValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'password is required',
    }),
    newPassword: z.string({
      required_error: 'password is required',
    }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'refresh token is required',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id token is required',
    }),
  }),
});
// reset password validation
const resetPasswordValidationSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id token is required',
    }),
    newPassword: z.string({
      required_error: 'id token is required',
    }),
  }),
});

export const authValidation = {
  loginValidationSchema,
  passwordChangeValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
