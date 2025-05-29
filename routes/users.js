const router = require("express").Router();
const {
  getCurrentUser,
  updateUserProfile,
  getUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/userId", auth, getUser);

// Get current authenticated user's profile
router.get("/me", auth, getCurrentUser);

// Update current authenticated user's profile
router.patch("/me", auth, updateUserProfile);

module.exports = router;
