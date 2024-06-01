import { RequestStatus } from '@prisma/client';
import { z } from 'zod';

const createAdoptionRequestValidation = z.object({
  body: z.object({
    petId: z.string(),
    petOwnershipExperience: z.string(),
    contactInformation: z.string(),
    isAgreed: z.boolean(),
  }),
});
const updateStatusAdoptionRequestValidation = z.object({
  body: z.object({
    status: z.enum([
      RequestStatus.APPROVED,
      RequestStatus.PENDING,
      RequestStatus.REJECTED,
    ]),
  }),
});
export const adoptionRequestValidation = {
  createAdoptionRequestValidation,
  updateStatusAdoptionRequestValidation,
};
