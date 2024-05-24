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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const app_1 = require("../../../app");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
// register user service
const createUserIntoDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = userData, restData = __rest(userData, ["password"]);
    const hashedPassword = yield bcrypt_1.default.hash(password, Number(config_1.default.bcrypt_salt_rounds));
    const result = yield app_1.prisma.user.create({
        data: Object.assign(Object.assign({}, restData), { password: hashedPassword }),
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
// update user service
const updateUserIntoDB = (userInfo, userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.update({
        where: {
            id: userInfo.userId,
        },
        data: userData,
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
//get a user service
const getUserFromDB = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.user.findUniqueOrThrow({
        where: {
            id: userData.userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
exports.userService = {
    createUserIntoDB,
    getUserFromDB,
    updateUserIntoDB,
};
