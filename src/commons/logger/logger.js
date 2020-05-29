'use strict';

const winston = require('winston');

const logLevel = process.env.LOG_LEVEL || 'debug';
const logEnabled = process.env.LOG_ENABLED || 'true';
const logger = new (winston.Logger)();

if (logEnabled === 'true') {
  logger.add(winston.transports.Console, {
    prettyPrint: true,
    level: logLevel
  });

  if (process.env.NODE_ENV === 'production') {
    require('winston-logstash');
    logger.add(winston.transports.Logstash, {
      prettyPrint: true,
      level: logLevel,
      port: process.env.LOGSTASH_PORT || 28777,
      node_name: process.env.LOGSTASH_LABEL || 'node-api',
      max_connect_retries: process.env.LOGSTASH_MAX_CONNECTION_RETRIES || -1,
      host: process.env.LOGSTASH_HOST || '18.205.92.42'
    });
  }
}

module.exports = logger;
