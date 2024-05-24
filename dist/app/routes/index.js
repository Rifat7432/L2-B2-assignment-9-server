"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_routes_1 = require("../modules/User/user.routes");
const auth_route_1 = require("../modules/Auth/auth.route");
const pet_route_1 = require("../modules/Pet/pet.route");
const adoptionRequest_route_1 = require("../modules/AdoptionRequest/adoptionRequest.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/api',
        route: user_routes_1.userRoute,
    },
    {
        path: '/api',
        route: pet_route_1.petRoutes,
    },
    {
        path: '/api',
        route: adoptionRequest_route_1.adoptionRequestRoutes,
    },
    {
        path: '/api',
        route: auth_route_1.authRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
