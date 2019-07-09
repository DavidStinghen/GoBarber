import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

const routes = new Router();
const upload = multer(multerConfig);

// user store route
routes.post('/users', UserController.store);
// session store route
routes.post('/session', SessionController.store);

// using middleware to authenticate session
routes.use(authMiddleware);

// user update data route
routes.put('/users', UserController.update);

// route to upload file
routes.post('/files', upload.single('file'), FileController.store);

// route to index all providers
routes.get('/providers', ProviderController.index);

export default routes;
