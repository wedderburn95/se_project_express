const { statusCodes } = require("../utils/config");

class DuplicateEmailError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCodes.DuplicateEmailError;
  }
}

module.exports = DuplicateEmailError;
