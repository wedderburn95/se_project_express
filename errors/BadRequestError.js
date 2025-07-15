const { statusCodes } = require("../utils/config");

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.Bad_Request;
  }
}

module.exports = {
  BadRequestError,
};

module.exports = BadRequestError;
