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
Object.defineProperty(exports, "__esModule", { value: true });
exports.petServices = void 0;
const app_1 = require("../../../app");
const pagination_1 = require("../../../helper/pagination");
const pet_constant_1 = require("./pet.constant");
// create pet service
const createPetIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield app_1.prisma.pet.create({
        data: payload,
    });
    return result;
});
// get all pet service
const getAllPetsFromDB = (query, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, age } = query, filterData = __rest(query, ["searchTerm", "age"]);
    const { page, limit, skip, sortBy, sortOrder } = pagination_1.paginationHelper.calculatePagination(options);
    const andCondition = [];
    if (searchTerm) {
        andCondition.push({
            OR: pet_constant_1.searchFields.map((filed) => ({
                [filed]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (age) {
        andCondition.push({
            AND: [
                {
                    age: Number(age),
                },
            ],
        });
    }
    if (Object.keys(filterData).length > 0) {
        andCondition.push({
            AND: Object.keys(filterData).map((key) => ({
                [key]: {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    equals: filterData[key],
                },
            })),
        });
    }
    const whereCondition = { AND: andCondition };
    const result = yield app_1.prisma.pet.findMany({
        where: whereCondition,
        skip: skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
    });
    const total = yield app_1.prisma.pet.count({ where: whereCondition });
    return {
        meta: { page, limit, total },
        data: result,
    };
});
// update pet service
const updatePetIntoDB = (id, petData) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.pet.findUniqueOrThrow({
        where: {
            id,
        },
    });
    const result = yield app_1.prisma.pet.update({
        where: {
            id,
        },
        data: petData,
    });
    return result;
});
exports.petServices = {
    createPetIntoDB,
    getAllPetsFromDB,
    updatePetIntoDB,
};
