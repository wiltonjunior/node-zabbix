'use strict';

const logger = require('../logger/logger');
module.exports = (err, req, res, next) => {
  logger.error(err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.statusCode || 500).json({
    message: err.message,
    data: err.data || (process.env.NODE_ENV === 'development' ? err.stack : {})
  });
};
