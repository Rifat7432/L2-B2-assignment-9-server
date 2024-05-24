import { z } from 'zod';

const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    photo: z.string().url(),
    email: z.string().email(),
    password: z.string(),
  }),
});
const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    photo: z.string().url().optional(),
    email: z.string().email().optional(),
  }),
});

export const userValidation = {
  createUserValidation,
  updateUserValidation,
};
