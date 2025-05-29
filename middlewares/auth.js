const jwt = require("jsonwebtoken");
const { statusCodes } = require("../utils/config");

const auth = (req, res, next) => {
  const { JWT_SECRET } = process.env;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
      .status(statusCodes.UNAUTHORIZED)
      .send({ message: "Invalid token" });
  }
  req.user = payload;
  return next();
};

module.exports = auth;
