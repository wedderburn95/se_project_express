const { statusCodes } = require("../utils/config");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Bad_Request;
  }
}

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ForbiddenError;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NotFoundError;
  }
}

class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.DuplicateEmailError;
  }
}

class INTERNAL_SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.INTERNAL_SERVER_ERROR;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UnauthorizedError;
  }
}

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  DuplicateEmailError,
  UnauthorizedError,
  INTERNAL_SERVER_ERROR,
};
