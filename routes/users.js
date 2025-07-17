const router = require("express").Router();
const { getCurrentUser, updateUserProfile } = require("../controllers/users");
const auth = require("../middlewares/auth");
const { validateUserUpdate } = require("../middlewares/validation");

// Get current authenticated user's profile
router.get("/me", auth, getCurrentUser);

// Update current authenticated user's profile
router.patch("/me", auth, validateUserUpdate, updateUserProfile);

module.exports = router;
