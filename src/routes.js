import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

// user store route
routes.post('/users', UserController.store);
// session store route
routes.post('/session', SessionController.store);

// using middleware to authenticate session
routes.use(authMiddleware);

// user update data route
routes.put('/users', UserController.update);

export default routes;
