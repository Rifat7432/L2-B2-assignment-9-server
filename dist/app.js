"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
exports.prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send({
        massage: "Hello world",
    });
});
app.use('/', routes_1.default);
app.use(globalErrorHandler_1.gobbleErrorHandler.gobbleError);
app.use(globalErrorHandler_1.gobbleErrorHandler.notFound);
exports.default = app;
