const mongoose = require("mongoose");

const User = require("../models/user");

const { statusCodes } = require("../utils/constants");

// GET /users
// const BAD_RequestStatus_CODE = 400; Use this instead of the hard coded numbers.

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(statusCodes.OK).send(users))
    .catch((err) => {
      console.error(err);
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  return User.create({ name, avatar })
    .then((user) => res.status(statusCodes.CREATED).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: err.message });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: err.message });
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
        .send({ message: err.message });
    });
};

module.exports = { getUsers, createUser, getUser };
