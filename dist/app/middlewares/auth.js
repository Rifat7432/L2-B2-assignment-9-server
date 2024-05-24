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
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const config_1 = __importDefault(require("../config"));
const app_1 = require("../../app");
const auth_utils_1 = require("../modules/Auth/auth.utils");
const appErrors_1 = require("../../errors/appErrors");
const auth = () => {
    return (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.headers.authorization;
        if (!token) {
            throw new appErrors_1.AppError(http_status_1.default.UNAUTHORIZED, 'Unauthorized Access');
        }
        const decoded = (0, auth_utils_1.verifyToken)(token, config_1.default.jwt_access_secret);
        const { userId } = decoded;
        yield app_1.prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            },
        });
        req.user = decoded;
        next();
    }));
};
exports.default = auth;
