const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const NOT_FOUND_STATUS_CODE = 404;

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(NOT_FOUND_STATUS_CODE).send({ message: "Route not found" });
});

module.exports = router;
