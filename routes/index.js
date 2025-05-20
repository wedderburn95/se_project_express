const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const { statusCodes } = require("../utils/constants");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
