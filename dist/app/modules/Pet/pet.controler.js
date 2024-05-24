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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const pet_service_1 = require("./pet.service");
const pet_constant_1 = require("./pet.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
//create pet controller
const createPet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.petServices.createPetIntoDB(req.body);
    (0, sendResponse_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Pet added successfully',
        data: result,
    });
}));
// get all pet controller
const getAllPets = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, pet_constant_1.userFilterFields);
    const options = (0, pick_1.default)(req.query, ["page", "limit", "sortBy", "sortOrder"]);
    const result = yield pet_service_1.petServices.getAllPetsFromDB(filter, options);
    return (0, sendResponse_1.sendRes)(res, Object.assign({ success: true, statusCode: http_status_1.default.OK, message: 'Pets retrieved successfully' }, result));
}));
// update pet controller
const updatePet = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield pet_service_1.petServices.updatePetIntoDB(req.params.petId, req.body);
    return (0, sendResponse_1.sendRes)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Pets retrieved successfully',
        data: result,
    });
}));
exports.petControllers = {
    createPet,
    getAllPets,
    updatePet,
};
