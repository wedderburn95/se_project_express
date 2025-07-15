const { statusCodes } = require("../utils/config");

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.NotFoundError;
  }
}

module.exports = NotFoundError;
