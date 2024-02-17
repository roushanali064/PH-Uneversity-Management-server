import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { constSemesterRegistrationService } from './semesterRegistration.service';
import sendResponse from '../../utils/sendResponse';

// create semester registration
const createSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await constSemesterRegistrationService.createSemesterRegistrationIntiDB(
        req.body,
      );

    sendResponse(res, {
      statusCode: 201,
      success: true,
      message: 'semester registration successfully',
      data: result,
    });
  },
);

// get all semester registration
const getSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await constSemesterRegistrationService.getSingleSemesterRegistrationFromDB(
        id,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester retrieve successfully',
      data: result,
    });
  },
);

// create semester registration
const getAllSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const result =
      await constSemesterRegistrationService.getAllSemesterREgistrationFromDB(
        req.query,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester retrieve successfully',
      meta: result.meta,
      data: result.result,
    });
  },
);

// update semester registration
const updateSingleSemesterRegistration = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result =
      await constSemesterRegistrationService.updateSemesterRegistrationIntoDB(
        id,
        req.body,
      );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'semester retrieve successfully',
      data: result,
    });
  },
);

export const semesterRegistrationController = {
  createSemesterRegistration,
  getSingleSemesterRegistration,
  getAllSemesterRegistration,
  updateSingleSemesterRegistration,
};
