import { Router } from 'express';
import { userRoute } from '../modules/User/user.routes';
import { authRoutes } from '../modules/Auth/auth.route';
import { petRoutes } from '../modules/Pet/pet.route';
import { adoptionRequestRoutes } from '../modules/AdoptionRequest/adoptionRequest.route';


const router = Router();

const moduleRoutes = [
  {
    path: '/api',
    route: userRoute,
  },
  {
    path: '/api',
    route: petRoutes,
  },
  {
    path: '/api',
    route: adoptionRequestRoutes,
  },
  {
    path: '/api',
    route: authRoutes,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));


export default router;
