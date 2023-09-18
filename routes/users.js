const router = require("express").Router();

const {
  createUser,
  getUsers,
  deleteUser,
  getUserById,
} = require("../contollers/users");

router.post("/", createUser); // creates new user
router.get("/", getUsers); // retrieves the users
router.get("/:userId", getUserById); // returns the requested user if exist
router.delete("/:userId", deleteUser); // deletes an user

module.exports = router;
