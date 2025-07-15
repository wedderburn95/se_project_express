const { statusCodes } = require("../utils/config");

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.UnauthorizedError;
  }
}

module.exports = UnauthorizedError;
