import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

// user store route
routes.post('/users', UserController.store);

// session store route
routes.post('/session', SessionController.store);

export default routes;
