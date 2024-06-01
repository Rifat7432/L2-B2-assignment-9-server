import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendRes } from '../../../shared/sendResponse';
import { adoptionRequestServices } from './adoptionRequest.service';
// adoption request controller
const createAdoptionRequest = catchAsync(async (req, res) => {
  const result = await adoptionRequestServices.createAdoptionRequestIntoDB(
    req.user,
    req.body,
  );
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Adoption request submitted successfully',
    data: result,
  });
});
// get adoption request controller
const getAllAdoptionRequest = catchAsync(async (req, res) => {
  const result = await adoptionRequestServices.getAllAdoptionRequestFromDB();
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Adoption requests retrieved successfully',
    data: result,
  });
});
// get adoption request controller
const getAllAdoptionRequestPet = catchAsync(async (req, res) => {
  const result = await adoptionRequestServices.getPetsOfUserFromDB(
    req.params.userId,
  );
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Adoption requests retrieved successfully',
    data: result,
  });
});
// get adoption request controller
const getAllUnapprovedAdoptionRequest = catchAsync(async (req, res) => {
  const result = await adoptionRequestServices.getUnapprovedRequestOfUserFromDB(
    req.params.userId,
  );
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Unapproved requests retrieved successfully',
    data: result,
  });
});
// update adoption request controller
const updateStatusAdoptionRequest = catchAsync(async (req, res) => {
  const result =
    await adoptionRequestServices.updateStatusAdoptionRequestIntoDB(
      req.params.requestId,
      req.body,
    );
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Adoption request updated successfully',
    data: result,
  });
});
export const adoptionRequestControllers = {
  createAdoptionRequest,
  getAllAdoptionRequest,
  updateStatusAdoptionRequest,
  getAllAdoptionRequestPet,
  getAllUnapprovedAdoptionRequest,
};
