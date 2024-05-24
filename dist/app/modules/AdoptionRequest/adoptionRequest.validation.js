"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestValidation = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const createAdoptionRequestValidation = zod_1.z.object({
    body: zod_1.z.object({
        petId: zod_1.z.string(),
        petOwnershipExperience: zod_1.z.string(),
    }),
});
const updateStatusAdoptionRequestValidation = zod_1.z.object({
    body: zod_1.z.object({
        status: zod_1.z.enum([
            client_1.RequestStatus.APPROVED,
            client_1.RequestStatus.PENDING,
            client_1.RequestStatus.REJECTED,
        ]),
    }),
});
exports.adoptionRequestValidation = {
    createAdoptionRequestValidation,
    updateStatusAdoptionRequestValidation
};
