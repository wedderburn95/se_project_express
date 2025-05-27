const jwt = require("jsonwebtoken");
const { statusCodes } = require("../utils/config");

const { JWT_SECRET } = process.env;

// const payload = jwt.verify(token, JWT_SECRET);

// const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
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
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Invalid token" });
  }
  req.user = payload;
  next();
};

module.exports = auth;
