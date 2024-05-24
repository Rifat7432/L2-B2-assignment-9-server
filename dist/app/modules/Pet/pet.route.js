"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.petRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const pet_controler_1 = require("./pet.controler");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const pet_validation_1 = require("./pet.validation");
const router = express_1.default.Router();
//create pet route
router.post('/pets', (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.createPetValidation), pet_controler_1.petControllers.createPet);
// get all pet route
router.get('/pets', pet_controler_1.petControllers.getAllPets);
// update pet route
router.put('/pets/:petId', (0, auth_1.default)(), (0, validateRequest_1.default)(pet_validation_1.petValidation.updatePetValidation), pet_controler_1.petControllers.updatePet);
exports.petRoutes = router;
