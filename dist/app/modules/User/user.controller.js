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
exports.userController = void 0;
const user_service_1 = require("./user.service");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = require("../../../shared/sendResponse");
const http_status_1 = __importDefault(require("http-status"));
// register user controller
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.createUserIntoDB(req.body);
    (0, sendResponse_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User registered successfully',
        data: result,
    });
}));
// update user controller
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.updateUserIntoDB(req.user, req.body);
    (0, sendResponse_1.sendRes)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User profile updated successfully',
        data: result,
    });
}));
//get a user controller
const getUserProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.userService.getUserFromDB(req.user);
    return (0, sendResponse_1.sendRes)(res, {
        success: true,
        statusCode: http_status_1.default.OK,
        message: 'User profile retrieved successfully',
        data: result,
    });
}));
exports.userController = {
    createUser,
    updateUser,
    getUserProfile,
};
//MDRifat@74328
