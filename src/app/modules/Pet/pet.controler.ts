import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { sendRes } from '../../../shared/sendResponse';
import { petServices } from './pet.service';
import { userFilterFields } from './pet.constant';
import pick from '../../../shared/pick';
import { TFileImage } from '../../interface/imageReaponce';
//create pet controller
const createPet = catchAsync(async (req, res) => {
  const result = await petServices.createPetIntoDB(
    req.body,
    req.files as TFileImage[],
  );
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Pet added successfully',
    data: result,
  });
});
// get all pet controller
const getAllPets = catchAsync(async (req, res) => {
  const filter = pick(req.query, userFilterFields);
  const options = pick(req.query, ['page', 'limit', 'sortBy', 'sortOrder']);
  const result = await petServices.getAllPetsFromDB(filter, options);
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pets retrieved successfully',
    ...result,
  });
});
// update pet controller
const getPet = catchAsync(async (req, res) => {
  const result = await petServices.getPetFromDB(req.params.petId);
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pet retrieved successfully',
    data: result,
  });
});
// update pet controller
const updatePet = catchAsync(async (req, res) => {
  const result = await petServices.updatePetIntoDB(req.params.petId, req.body);
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Pet Updated successfully',
    data: result,
  });
});
export const petControllers = {
  createPet,
  getPet,
  getAllPets,
  updatePet,
};
