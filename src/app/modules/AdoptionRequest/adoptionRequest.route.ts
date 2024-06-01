import express from 'express';
import auth from '../../middlewares/auth';

import validateRequest from '../../middlewares/validateRequest';
import { adoptionRequestControllers } from './adoptionRequest.controller';
import { adoptionRequestValidation } from './adoptionRequest.validation';
import { UserRole } from '@prisma/client';

const router = express.Router();

// adoption request route
router.post(
  '/adoption-request',
  auth(UserRole.USER),
  validateRequest(adoptionRequestValidation.createAdoptionRequestValidation),
  adoptionRequestControllers.createAdoptionRequest,
);
// get adoption request route
router.get(
  '/adoption-requests',
  auth(UserRole.ADMIN),
  adoptionRequestControllers.getAllAdoptionRequest,
);
// get adoption request route
router.get(
  '/adoption-requests-pets/:userId',
  auth(UserRole.ADMIN, UserRole.USER),
  adoptionRequestControllers.getAllAdoptionRequestPet,
);
// get adoption request route
router.get(
  '/adoption-requests-unapproved/:userId',
  auth(UserRole.ADMIN, UserRole.USER),
  adoptionRequestControllers.getAllUnapprovedAdoptionRequest,
);
// update adoption request route

router.put(
  '/adoption-requests/:requestId',
  auth(UserRole.ADMIN),
  validateRequest(
    adoptionRequestValidation.updateStatusAdoptionRequestValidation,
  ),
  adoptionRequestControllers.updateStatusAdoptionRequest,
);

export const adoptionRequestRoutes = router;
