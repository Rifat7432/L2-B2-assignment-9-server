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
exports.authenticationServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const app_1 = require("../../../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const appErrors_1 = require("../../../errors/appErrors");
const auth_utils_1 = require("./auth.utils");
const config_1 = __importDefault(require("../../config"));
// login user service
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield app_1.prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
        },
    });
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, userData.password);
    if (!isPasswordMatched) {
        throw new appErrors_1.AppError(http_status_1.default.FORBIDDEN, 'Incorrect password');
    }
    const jwtPayload = {
        userId: userData.id
    };
    const token = (0, auth_utils_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        token,
    };
});
exports.authenticationServices = {
    loginUserIntoDB,
};
