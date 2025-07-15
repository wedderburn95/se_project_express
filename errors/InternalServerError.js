const { statusCodes } = require("../utils/config");

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.InternalServerError;
  }
}

module.exports = InternalServerError;
