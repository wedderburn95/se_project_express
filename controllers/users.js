const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const mongoose = require("mongoose");

const User = require("../models/user");

const {
  BadRequestError,
  // ForbiddenError,
  NotFoundError,
  DuplicateEmailError,
  UnauthorizedError,
  INTERNAL_SERVER_ERROR,
} = require("../errors/BadRequestError");

const { statusCodes } = require("../utils/config");

// GET /users
// const BAD_RequestStatus_CODE = 400; Use this instead of the hard coded numbers.

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
        // return res
        //   .status(statusCodes.DuplicateEmailError)
        //   .send({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return next(new BadRequestError("An error has occurred on the server"));
        // return res
        //   .status(statusCodes.BAD_REQUEST)
        //   .send({ message: "An error has occurred on the server" });
      }
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
      // return res
      //   .status(statusCodes.INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadRequestError("Please include email or password"));
    // return res
    //   .status(statusCodes.BAD_REQUEST)
    //   .send({ message: "Please include email or password" });
  }
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError("Invalid email or password"));
        // return res
        //   .status(statusCodes.UNAUTHORIZED)
        //   .send({ message: "Invalid email or password" });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new UnauthorizedError("Invalid email or password"));
          // res
          //   .status(statusCodes.UNAUTHORIZED)
          //   .send({ message: "Invalid email or password" });
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
      // res
      //   .status(statusCodes.INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
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
        // res
        //   .status(statusCodes.NotFoundError)
        //   .send({ message: "User not found" });
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid user data"));
        // res
        //   .status(statusCodes.BAD_REQUEST)
        //   .send({ message: "Invalid user data" });
      }
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
      // return res
      //   .status(statusCodes.INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

// GET /users/me
const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
        // res
        //   .status(statusCodes.NotFoundError)
        //   .send({ message: "User not found" });
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      return next(
        new INTERNAL_SERVER_ERROR("An error has occurred on the server")
      );
      // return res
      //   .status(statusCodes.INTERNAL_SERVER_ERROR)
      //   .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createUser,
  login,
  updateUserProfile,
  getCurrentUser,
};
