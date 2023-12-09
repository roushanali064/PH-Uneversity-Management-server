import mongoose from "mongoose";
import { TErrorSurceases, TGenericErrorResponse } from "../interface/err";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse =>{

    const errorSource: TErrorSurceases = [{
        path: err?.path,
        message: err?.message
    }]

    const statusCode = 400;
    
      return {
        statusCode,
        message: 'Invalid Id',
        errorSource,
      };
}

export default handleCastError