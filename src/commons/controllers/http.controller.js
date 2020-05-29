'use strict';

const BaseController = require('./base.controller');

class HttpController extends BaseController {
  constructor() {
    super();
    this.messages = require('../constants/messages.constants');
    this.HttpError = require('../utils/http.error');
  }

  _sendResponse(res, next, data, message = '') {
    res.status(200).json({
      message,
      data
    });
    if (next) {
      next();
    }
  }
}

module.exports = HttpController;
