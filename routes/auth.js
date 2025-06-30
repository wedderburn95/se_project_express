const router = require("express").Router();
const { createUser, login } = require("../controllers/users");
const {
  validateUserBody,
  validateLogin,
} = require("../middlewares/validation");

router.post("/signup", validateUserBody, createUser);
router.post("/signin", validateLogin, login);

module.exports = router;
