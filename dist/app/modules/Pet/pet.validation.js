"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petValidation = void 0;
const zod_1 = require("zod");
const createPetValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        species: zod_1.z.string(),
        breed: zod_1.z.string(),
        age: zod_1.z.number().int().positive(),
        size: zod_1.z.string(),
        location: zod_1.z.string(),
        description: zod_1.z.string(),
        temperament: zod_1.z.string(),
        medicalHistory: zod_1.z.string(),
        adoptionRequirements: zod_1.z.string(),
    }),
});
const updatePetValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        species: zod_1.z.string().optional(),
        breed: zod_1.z.string().optional(),
        age: zod_1.z.number().int().positive().optional(),
        size: zod_1.z.string(),
        location: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        temperament: zod_1.z.string().optional(),
        medicalHistory: zod_1.z.string().optional(),
        adoptionRequirements: zod_1.z.string().optional(),
    }),
});
exports.petValidation = { createPetValidation, updatePetValidation };
