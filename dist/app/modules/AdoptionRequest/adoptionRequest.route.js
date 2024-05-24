"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adoptionRequestRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const adoptionRequest_controller_1 = require("./adoptionRequest.controller");
const adoptionRequest_validation_1 = require("./adoptionRequest.validation");
const router = express_1.default.Router();
// adoption request route
router.post('/adoption-request', (0, auth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validation_1.adoptionRequestValidation.createAdoptionRequestValidation), adoptionRequest_controller_1.adoptionRequestControllers.createAdoptionRequest);
// get adoption request route
router.get('/adoption-requests', (0, auth_1.default)(), adoptionRequest_controller_1.adoptionRequestControllers.getAllAdoptionRequest);
// update adoption request route
router.put('/adoption-requests/:requestId', (0, auth_1.default)(), (0, validateRequest_1.default)(adoptionRequest_validation_1.adoptionRequestValidation.updateStatusAdoptionRequestValidation), adoptionRequest_controller_1.adoptionRequestControllers.updateStatusAdoptionRequest);
exports.adoptionRequestRoutes = router;
