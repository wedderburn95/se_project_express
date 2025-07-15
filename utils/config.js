const { JWT_SECRET = "dev-secret" } = process.env;

const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  ForbiddenError: 403,
  NotFoundError: 404,
  InternalServerError: 500,
  DuplicateEmailError: 409,
  UnauthorizedError: 401,
};

module.exports = { statusCodes, JWT_SECRET };
