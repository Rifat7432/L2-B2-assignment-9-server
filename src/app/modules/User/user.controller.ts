import { userService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import { sendRes } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

// register user controller
const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUserIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
const createAdmin = catchAsync(async (req, res) => {
  const result = await userService.createAdminIntoDB(req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
// update user controller
const updateUser = catchAsync(async (req, res) => {
  const result = await userService.updateUserIntoDB(req.user, req.body);
  sendRes(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile updated successfully',
    data: result,
  });
});
//get a user controller
const getUserProfile = catchAsync(async (req, res) => {
  const result = await userService.getUserFromDB(req.user);
  return sendRes(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User profile retrieved successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createAdmin,
  updateUser,
  getUserProfile,
};
//MDRifat@74328
