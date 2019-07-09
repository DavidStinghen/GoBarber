import express from 'express';
import path from 'path';

import routes from './routes';
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    // middleware to use json
    this.server.use(express.json());
    // middleware path to static files
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    );
  }

  routes() {
    this.server.use(routes);
  }
}
export default new App().server;
