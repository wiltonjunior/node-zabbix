'use strict';

const asyncMiddleware = require('../middleware/async.middleware');

class BaseRouter {
  constructor() {
    this.router = require('express').Router({ mergeParams: true });
  }

  post(path, fn, ...middlewares) {
    this.router.post(path, middlewares, asyncMiddleware(fn.bind(this.controller)));
  }

  get(path, fn, ...middlewares) {
    this.router.get(path, middlewares, asyncMiddleware(fn.bind(this.controller)));
  }

  put(path, fn, ...middlewares) {
    this.router.put(path, middlewares, asyncMiddleware(fn.bind(this.controller)));
  }

  delete(path, fn, ...middlewares) {
    this.router.delete(path, middlewares, asyncMiddleware(fn.bind(this.controller)));
  }

  initialize() { }

  getRouter() {
    this.initialize();
    return this.router;
  }
}

module.exports = BaseRouter;
