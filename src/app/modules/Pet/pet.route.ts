import express from 'express';
import auth from '../../middlewares/auth';
import { petControllers } from './pet.controler';
import validateRequest from '../../middlewares/validateRequest';
import { petValidation } from './pet.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();
//create pet route
router.post(
  '/pets',
  // auth(UserRole.ADMIN),
  validateRequest(petValidation.createPetValidation),
  petControllers.createPet,
);
// get all pet route
router.get('/pets', petControllers.getAllPets);
// get a pet route
router.get(
  '/pet/:petId',
  auth(UserRole.ADMIN, UserRole.USER),
  petControllers.getPet,
);
// update pet route
router.put(
  '/pets/:petId',
  auth(UserRole.ADMIN),
  validateRequest(petValidation.updatePetValidation),
  petControllers.updatePet,
);

export const petRoutes = router;
