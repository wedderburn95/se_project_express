const router = require("express").Router();

const userRouter = require("./users");
const clothingItemRouter = require("./clothingItems");

const {
  createUser,
  login,
  getCurrentUser,
  updateUserProfile,
} = require("../controllers/users");
const { statusCodes } = require("../utils/config");
const auth = require("../middlewares/auth");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.post("/users", createUser);
router.post("/signin", login);

router.use(auth);

router.get("/users/me", getCurrentUser);
router.patch("/users/me", updateUserProfile);

router.use((req, res) => {
  res.status(statusCodes.NOT_FOUND).send({ message: "Route not found" });
});

module.exports = router;
