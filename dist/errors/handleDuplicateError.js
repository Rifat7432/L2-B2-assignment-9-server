"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateError = (err) => {
    const [[path, value]] = Object.entries(err === null || err === void 0 ? void 0 : err.keyValue);
    const errorSources = [
        {
            path: path,
            message: `${value} is already exist`,
        },
    ];
    const statusCode = http_status_1.default.NOT_ACCEPTABLE;
    return {
        statusCode,
        message: 'Validation Error',
        errorSources,
    };
};
exports.default = handleDuplicateError;
