const BadRequestError = require("./BadRequestError");
const ForbiddenError = require("./ForbiddenError");
const NotFoundError = require("./NotFoundError");
const DuplicateEmailError = require("./DuplicateEmailError");
const UnauthorizedError = require("./UnauthorizedError");
const InternalServerError = require("./InternalServerError");

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  DuplicateEmailError,
  UnauthorizedError,
  InternalServerError,
};
