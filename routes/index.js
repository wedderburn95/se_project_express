const router = require("express").Router();

const auth = require("../middlewares/auth");
const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const { statusCodes } = require("../utils/config");

// Public routes
router.post("/signup", createUser);
router.post("/signin", login);

// Protect all routes below this line
// router.use(auth);

// Authenticated routes
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
