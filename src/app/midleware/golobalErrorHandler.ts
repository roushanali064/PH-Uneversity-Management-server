/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import  {  ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { TErrorSurceases } from '../interface/err';
import config from '../config';
import { handleZodError } from '../error/handleZodError';
import handleMongooseError from '../error/handleMongoseError';
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next)=>{
    let statusCode = err.statusCode || 500
    let message =err.message || 'something went wrong'

    

    let errorSources: TErrorSurceases = [
      {
        path:'',
        message: 'something went wrong'
      }
    ]

    // check zod error
    if(err instanceof ZodError){
      const simplifiedError = handleZodError(err)
      statusCode = simplifiedError?.statusCode
      message = simplifiedError?.message
      errorSources = simplifiedError?.errorSource
    }else if (err?.name === 'ValidationError'){
      const simplifiedError = handleMongooseError(err)
      statusCode = simplifiedError?.statusCode
      message = simplifiedError?.message
      errorSources = simplifiedError?.errorSource
    }

    return res.status(statusCode).json({
      success: false,
      message,
      errorSources,
      stack: config.NODE_ENV === 'development' ?  err?.stack : null
    })
  }

export default globalErrorHandler