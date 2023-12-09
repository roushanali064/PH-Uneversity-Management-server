import { ZodError, ZodIssue } from "zod";
import { TErrorSurceases } from "../interface/err";

// handle zod error
export const handleZodError = (err: ZodError) =>{
    const errorSource: TErrorSurceases = err.issues.map((issue: ZodIssue)=>{
      return {
        path: issue?.path[issue.path.length-1],
        message: issue?.message
      }
    })

    const statusCode = 400;

    return {
      statusCode,
      message: 'validation error',
      errorSource
    }

  }