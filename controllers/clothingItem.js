const mongoose = require("mongoose");

const ClothingItem = require("../models/clothingItem");

const { statusCodes } = require("../utils/config");

// GET /items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(statusCodes.OK).send(items))
    .catch(() =>
      res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" })
    );
};

// POST /items
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  return ClothingItem.create({ name, weather, imageUrl, likes: [], owner })
    .then((item) => res.status(statusCodes.CREATED).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "An error has occurred on the server" });
      }
      return res
        .status(statusCodes.BAD_REQUEST)
        .send({ message: "Internal Server Error" });
    });
};

// DELETE /items/:itemId
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Invalid item ID" });
  }

  return ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "Item not found" });
      }

      // ✅ Ownership check
      if (item.owner.toString() !== req.user._id) {
        return res
          .status(statusCodes.FORBIDDEN)
          .send({ message: "You are not allowed to delete this item" });
      }

      return item.deleteOne().then(() => res.status(statusCodes.OK).send(item));
    })
    .catch((err) => {
      console.error(err);
      res
        .status(statusCodes.FORBIDDEN_ERROR)
        .send({ message: "An error occurred while deleting the item" });
    });
};

// PUT /items/:itemId/likes
const likeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // Replace with real user ID if using auth

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Invalid  item ID" });
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "Item not found" });
      }
      return res.status(statusCodes.OK).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

// DELETE /items/:itemId/likes
const unlikeItem = (req, res) => {
  const { itemId } = req.params;
  const userId = req.user._id; // req.user._id

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        return res
          .status(statusCodes.NOT_FOUND)
          .send({ message: "Item not found" });
      }
      return res.status(statusCodes.OK).send(item);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        return res
          .status(statusCodes.BAD_REQUEST)
          .send({ message: "Invalid item ID" });
      }
      return res
        .status(statusCodes.INTERNAL_SERVER_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
};
