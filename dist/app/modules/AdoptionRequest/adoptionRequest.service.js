"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestServices = void 0;
const app_1 = require("../../../app");
// adoption request service
const createAdoptionRequestIntoDB = (payload, adoptionData) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.pet.findUniqueOrThrow({
        where: {
            id: adoptionData.petId,
        },
    });
    const result = yield app_1.prisma.adoptionRequest.create({
        data: Object.assign(Object.assign({}, adoptionData), { userId: payload.userId }),
    });
    return result;
});
// get adoption request service
const getAllAdoptionRequestFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.adoptionRequest.findMany({});
    return result;
});
// update adoption request service
const updateStatusAdoptionRequestIntoDB = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.adoptionRequest.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield app_1.prisma.adoptionRequest.update({
        where: {
            id,
        },
        data: status,
    });
    return result;
});
exports.adoptionRequestServices = {
    createAdoptionRequestIntoDB,
    getAllAdoptionRequestFromDB,
    updateStatusAdoptionRequestIntoDB,
};
