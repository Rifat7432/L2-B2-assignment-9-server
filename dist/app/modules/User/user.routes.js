"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
//get a user route
router.get('/profile', (0, auth_1.default)(), user_controller_1.userController.getUserProfile);
//update user route
router.put('/profile', (0, auth_1.default)(), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserValidation), user_controller_1.userController.updateUser);
//register user route
router.post('/register', (0, validateRequest_1.default)(user_validation_1.userValidation.createUserValidation), user_controller_1.userController.createUser);
exports.userRoute = router;
