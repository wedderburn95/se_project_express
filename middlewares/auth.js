const jwt = require("jsonwebtoken");
const { statusCodes } = require("../utils/config");

const auth = (req, res, next) => {
  const { JWT_SECRET = "dev-secret" } = process.env;
  const { authorization } = req.headers;
  console.log("JWT_SECRET from process.env:", process.env.JWT_SECRET);

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(statusCodes.UnauthorizedError)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(statusCodes.UnauthorizedError)
      .send({ message: "Invalid token" });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
