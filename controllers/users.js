const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");

const { statusCodes } = require("../utils/config");

// GET /users
// const BAD_RequestStatus_CODE = 400; Use this instead of the hard coded numbers.

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusCodes.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

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
        return res
          .status(statusCodes.DUPLICATE_EMAIL)
          .send({ message: "Email already exists" });
      }
      if (err.name === "ValidationError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "An error has occurred on the server" });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;
  return User.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return res
          .status(statusCodes.UNAUTHORIZED)
          .send({ message: "Invalid email or password" });
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return res
            .status(statusCodes.UNAUTHORIZED)
            .send({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ _id: user._id }, "secret-key", {
          expiresIn: "7d",
        });
        res.status(statusCodes.OK).send({ token });
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Invalid user ID format" });
  }
  return User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "User not found" });
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "CastError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "Invalid user ID format" });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// PATCH /users/me
const updateUserProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  return User.findByIdAndUpdate(
    userId,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "User not found" });
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "Invalid user data" });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// GET /users/me
const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "User not found" });
      }
      return res.status(statusCodes.OK).send(user);
    })
    .catch((err) => {
      console.error(err);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  login,
  updateUserProfile,
  getCurrentUser,
};
