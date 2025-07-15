const { statusCodes } = require("../utils/config");

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.ForbiddenError;
  }
}

module.exports = ForbiddenError;
