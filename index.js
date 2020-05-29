'use strict';

require('dotenv').config();
const express = require('express');

class App {
  constructor() {
    this.httpPort = process.env.HTTP_PORT;
    this.express = express();
    this.cors = require('cors');
    this.logger = require('./commons/logger/logger');
    this.errorHandler = require('./commons/handler/error.handler');

    this.middlewares();
    this.routes();
    this.initialize();
  }

  middlewares() {
    this.express.use(this.cors())
    this.express.use(express.json());
  }

  routes() {
    const Routes = require('./api/routes');
    Routes.initialize(this.express);
    this.express.use('*', this.errorHandler);
  }

  async initialize() {
    try {
      this.logger.info('Starting API server');
      this.express.listen(this.httpPort);
      this.logger.info('APP has started | port:', this.httpPort);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

module.exports = new App();
