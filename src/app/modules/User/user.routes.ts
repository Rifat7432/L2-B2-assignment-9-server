import express from 'express';
import { userController } from './user.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { UserRole } from '@prisma/client';
import { upload } from '../../../shared/uploadImage';
import makeJson from '../../middlewares/makeJson';

const router = express.Router();
//get a user route
router.get(
  '/profile',
  auth(UserRole.ADMIN, UserRole.USER),
  userController.getUserProfile,
);
//update user route
router.put(
  '/profile',
  auth(UserRole.ADMIN, UserRole.USER),
  validateRequest(userValidation.updateUserValidation),
  userController.updateUser,
);
//register user route
router.post(
  '/register',
  upload.single("file"),
  makeJson("data"),
  validateRequest(userValidation.createUserValidation),
  userController.createUser,
);
router.post(
  '/register-admin',
  upload.single("file"),
  makeJson("data"),
  auth(UserRole.ADMIN),
  validateRequest(userValidation.createUserValidation),
  userController.createUser,
);


export const userRoute = router;
