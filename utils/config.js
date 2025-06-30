const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  ForbiddenError: 403,
  NotFoundError: 404,
  INTERNAL_SERVER_ERROR: 500,
  DuplicateEmailError: 409,
  UnauthorizedError: 401,
};

module.exports = { statusCodes };
