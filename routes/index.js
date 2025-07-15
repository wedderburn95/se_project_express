const router = require("express").Router();
const { NotFoundError } = require("../utils/config");

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");
const { login, createUser } = require("../controllers/users");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

// Public routes
router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

// Protect all routes below this line

// Authenticated routes
router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});

module.exports = router;
