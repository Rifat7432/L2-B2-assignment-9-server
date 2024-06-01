import { Gender } from '@prisma/client';
import { z } from 'zod';

const createPetValidation = z.object({
  body: z.object({
    name: z.string(),
    photos: z.array(z.string()),
    gender: z.enum([Gender.MALE, Gender.FEMALE]),
    species: z.string(),
    breed: z.string(),
    age: z.number().int().positive(),
    size: z.string(),
    location: z.string(),
    description: z.string(),
    temperament: z.string(),
    medicalHistory: z.string(),
    adoptionTerms: z.string(),
    specialNeeds: z.boolean(),
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
