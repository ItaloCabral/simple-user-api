const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const router = require('./routes');

require('./config/connection');

import { Request, Response, NextFunction } from 'express';

class App {

  app = express();

  constructor() {
    this.middlewares();
    this.routes();
  }

  middlewares() {

    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use((requset: Request, response: Response, next: NextFunction) => {

      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Access, Authorization');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

      this.app.use(cors());
      next();

    });

  }

  routes() {
    this.app.use(router);
  }
}

module.exports = new App().app;
