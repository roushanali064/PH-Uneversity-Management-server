import { ZodError, ZodIssue } from 'zod';
import { TErrorSurceases, TGenericErrorResponse } from '../interface/err';

// handle zod error
export const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSource: TErrorSurceases = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'validation error',
    errorSource,
  };
};
