const jwt = require("jsonwebtoken");
// const { statusCodes } = require("../utils/config");
const UnauthorizedError = require("../errors/UnauthorizedError");

const auth = (req, res, next) => {
  const { JWT_SECRET = "dev-secret" } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return next(new UnauthorizedError("Authorization required"));
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(new UnauthorizedError("Aurorizathion required"));
  }
  req.user = payload;
  return next();
};

module.exports = auth;
