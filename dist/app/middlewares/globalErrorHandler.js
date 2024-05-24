"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gobbleErrorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const appErrors_1 = require("../../errors/appErrors");
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
const jsonwebtoken_1 = require("jsonwebtoken");
const gobbleError = (err, req, res, next) => {
    let statusCode = 500;
    let message = err.message || 'something went wrong !!';
    let errorDetails = err;
    if (err instanceof appErrors_1.AppError) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        errorDetails = { issues: simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources };
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'PrismaClientKnownRequestError' &&
        (err === null || err === void 0 ? void 0 : err.meta.target)) {
        statusCode = http_status_1.default.BAD_REQUEST;
        message =
            (err === null || err === void 0 ? void 0 : err.meta.modelName) + ' ' + (err === null || err === void 0 ? void 0 : err.meta.target) + ' is already exist !!';
        errorDetails = err;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'NotFoundError') {
        statusCode = http_status_1.default.NOT_FOUND;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    else if (err instanceof jsonwebtoken_1.JsonWebTokenError) {
        statusCode = http_status_1.default.UNAUTHORIZED;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorDetails = err;
    }
    return res.status(statusCode).json({
        success: false,
        message: message,
        errorDetails,
    });
};
const notFound = (req, res, next) => {
    return res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        massage: 'API Not Fount !!',
        error: {
            path: req.originalUrl,
            massage: 'Your Url Is Not Fount !!',
        },
    });
};
exports.gobbleErrorHandler = {
    gobbleError,
    notFound,
};
