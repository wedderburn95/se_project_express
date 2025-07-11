const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const {
  BadRequestError,

  NotFoundError,
  DuplicateEmailError,
  UnauthorizedError,
  INTERNAL_SERVER_ERROR,
} = require("../errors/BadRequestError");

const { statusCodes } = require("../utils/config");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(statusCodes.CREATED).send(userData);
    })
    .catch((err) => {
      console.error(err);
      if (err.code === 11000) {
        return next(new DuplicateEmailError("Email already exists"));
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("An error has occurred on the server"));
      }
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Please include email or password"));
  }
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Invalid email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new UnauthorizedError("Invalid email or password"));
        }
        const token = jwt.sign(
          { _id: user._id },
          process.env.JWT_SECRET || "dev-secret",
          {
            expiresIn: "7d",
          }
        );
        return res.status(statusCodes.OK).send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      return next(
        new INTERNAL_SERVER_ERROR("An error has occured on the server")
      );
    });
};

// PATCH /users/me
const updateUserProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      const error = new Error("User not found");
      error.statusCode = statusCodes.NotFoundError;
      throw error;
    })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
      }
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
    });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
    });
};

module.exports = {
  createUser,
  login,
  updateUserProfile,
  getCurrentUser,
};
