const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItem");
const { validateId, validateCardBody } = require("../middlewares/validation");

// public
router.get("/", getItems);

// Protected
router.use(auth);
router.post("/", validateCardBody, createItem);
router.delete("/:itemId", validateId, deleteItem);
router.put("/:itemId/likes", validateId, likeItem);
router.delete("/:itemId/likes", validateId, unlikeItem);

module.exports = router;
