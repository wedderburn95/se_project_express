const winston = require("winston");
const expresswinston = require("express-winston");

// console.log(">> logger.js loaded from:", __filename);
const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(
    ({ level, message, timestamp, meta }) =>
      `${timestamp} ${level}; ${meta?.error?.stack || message}`
  )
);

const requestLogger = expresswinston.logger({
  transports: [
    new winston.transports.Console({ format: messageFormat }),
    new winston.transports.File({
      filename: "request.log",
      format: winston.format.json(),
    }),
  ],
});

const errorLogger = expresswinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "error.log",
      format: winston.format.json(),
    }),
  ],
});

module.exports = {
  requestLogger,
  errorLogger,
};
