/*
 * node-error-handler
 * Copyright 2019-2020 Leonardo Furnielis.
 * Licensed under MIT License
 */

'use strcit';

const validator = require('./lib/validator');
const status = require('./lib/data-builder');
const logger = require('./lib/logger');

module.exports = (options = {}) => {
  const debug = options.debug || false;
  const log = options.log || false;

  // eslint-disable-next-line no-unused-vars
  return (err, req, res, next) => {
    const statusCode = validator.isHttpStatusCode(err.code) || 500;
    const code = statusCode;

    const errorHandler = {
      error: {
        statusCode: code,
        code: status[statusCode],
      },
    };

    if (err.message && err.message !== '') {
      errorHandler.error.message = err.message;
    }

    if (debug) {
      errorHandler.error.stack = err.stack;
    }

    if (log && typeof log === 'boolean') {
      logger.error(errorHandler);
    } else if (log) {
      validator.isArrayOfFunctions(log);

      log.forEach(element => {
        element(err, errorHandler, req);
      });
    }

    return res.status(statusCode).json(errorHandler);
  };
};
