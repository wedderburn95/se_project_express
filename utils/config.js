const statusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  FORBIDDEN_ERROR: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  DUPLICATE_EMAIL: 409,
  UNAUTHORIZED: 401,
};

module.exports = { statusCodes };
