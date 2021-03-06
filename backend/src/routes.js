import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import multerConfig from './config/multer';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

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

// route to index all providers
routes.get('/providers', ProviderController.index);
// route to list available hours
routes.get('/providers/:providerId/available', AvailableController.index);

// route to create a new appointment
routes.post('/appointments', AppointmentController.store);
// route to list all appointments
routes.get('/appointments', AppointmentController.index);
// route to delete appointments
routes.delete('/appointments/:id', AppointmentController.delete);

// route to notify provider about a new appointment
routes.get('/notifications', NotificationController.index);
// route to change modification for read: true
routes.put('/notifications/:id', NotificationController.update);

// route to list appointments for providers
routes.get('/schedule', ScheduleController.index);

// route to upload file
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
