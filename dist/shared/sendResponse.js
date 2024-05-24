"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendRes = void 0;
const sendRes = (res, data) => {
    res.status(data === null || data === void 0 ? void 0 : data.statusCode).json({
        success: data === null || data === void 0 ? void 0 : data.success,
        message: data === null || data === void 0 ? void 0 : data.message,
        // eslint-disable-next-line no-undefined
        meta: data.meta || null || undefined,
        data: (data === null || data === void 0 ? void 0 : data.data) || null
    });
};
exports.sendRes = sendRes;
