const mongoose = require("mongoose");

const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  InternalServerError,
} = require("../errors/BadRequestError");

const { statusCodes } = require("../utils/config");

// GET /items
const getItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(statusCodes.OK).send(items))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
      }
      return next(
        new InternalServerError("An error has occurred on the server")
      );
    });
};

// POST /items
const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  return ClothingItem.create({ name, weather, imageUrl, likes: [], owner })
    .then((item) => res.status(statusCodes.CREATED).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item data"));
        // res
        // .status(statusCodes.BAD_REQUEST)
        // .send({ message: "An error has occurred on the server" });
      }
      return next(err);
      // res
      //   .status(statusCodes.InternalServerError)
      //   .send({ message: "Internal Server Error" });
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
    // res
    //   .status(statusCodes.BAD_REQUEST)
    //   .send({ message: "Invalid item ID" });
  }

  return ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
        // res
        //   .status(statusCodes.NotFoundError)
        //   .send({ message: "Item not found" });
      }

      // ✅ Ownership check
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You are not allowed to delete this item")
        );
      }

      return item.deleteOne().then(() => res.status(statusCodes.OK).send(item));
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

// PUT /items/:itemId/likes
const likeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Replace with real user ID if using auth

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid item ID"));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.status(statusCodes.OK).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(err);
    });
};

// DELETE /items/:itemId/likes
const unlikeItem = (req, res, next) => {
  const { itemId } = req.params;
  const userId = req.user._id; // req.user._id

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return next(new NotFoundError("Item not found"));
      }
      return res.status(statusCodes.OK).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      return next(new InternalServerError("Internal Server Error"));
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
