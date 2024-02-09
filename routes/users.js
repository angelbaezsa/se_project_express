const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const { getCurrentUser, updateProfile } = require("../contollers/users");
const { validateProfileAvatar } = require("../middlewares/validation");

router.get("/me", auth, getCurrentUser);
router.patch("/me", auth, validateProfileAvatar, updateProfile);

// router.post("/", createUser); // creates new user
// router.get("/", getUsers); // retrieves the users
// router.get("/:userId", getUserById); // returns the requested user if exist

module.exports = router;
