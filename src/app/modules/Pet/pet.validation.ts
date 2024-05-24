import { z } from 'zod';

const createPetValidation = z.object({
  body: z.object({
    name: z.string(),
    gender:z.string(),
    species: z.string(),
    breed: z.string(),
    age: z.number().int().positive(),
    size: z.string(),
    location: z.string(),
    description: z.string(),
    temperament: z.string(),
    medicalHistory: z.string(),
    adoptionRequirements: z.string(),
  }),
});
const updatePetValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    species: z.string().optional(),
    gender: z.string().optional(),
    breed: z.string().optional(),
    age: z.number().int().positive().optional(),
    size: z.string(),
    location: z.string().optional(),
    description: z.string().optional(),
    temperament: z.string().optional(),
    medicalHistory: z.string().optional(),
    adoptionRequirements: z.string().optional(),
  }),
});

export const petValidation = { createPetValidation, updatePetValidation };
