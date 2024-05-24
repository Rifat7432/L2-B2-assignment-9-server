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
exports.adoptionRequestControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const adoptionRequest_service_1 = require("./adoptionRequest.service");
// adoption request controller
const createAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.adoptionRequestServices.createAdoptionRequestIntoDB(req.user, req.body);
    return (0, sendResponse_1.sendRes)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Adoption request submitted successfully',
        data: result,
    });
}));
// get adoption request controller
const getAllAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.adoptionRequestServices.getAllAdoptionRequestFromDB();
    return (0, sendResponse_1.sendRes)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Adoption requests retrieved successfully',
        data: result,
    });
}));
// update adoption request controller
const updateStatusAdoptionRequest = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield adoptionRequest_service_1.adoptionRequestServices.updateStatusAdoptionRequestIntoDB(req.params.requestId, req.body);
    return (0, sendResponse_1.sendRes)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'Adoption request updated successfully',
        data: result,
    });
}));
exports.adoptionRequestControllers = {
    createAdoptionRequest,
    getAllAdoptionRequest,
    updateStatusAdoptionRequest,
};
