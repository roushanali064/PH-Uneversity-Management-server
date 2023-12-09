import mongoose from "mongoose";
import { TErrorSurceases } from "../interface/err";

const handleMongooseError = (err: mongoose.Error.ValidationError) =>{
    const errorSource: TErrorSurceases = Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
          return {
            path: val?.path,
            message: val?.message,
          };
        },
      );
    
      const statusCode = 400;
    
      return {
        statusCode,
        message: 'Validation Error',
        errorSource,
      };
}

export default handleMongooseError