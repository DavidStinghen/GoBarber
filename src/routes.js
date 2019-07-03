import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

// store route
routes.post('/users', UserController.store);

export default routes;
