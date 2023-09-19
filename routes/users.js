const router = require("express").Router();

const { createUser, getUsers, getUserById } = require("../contollers/users");

router.post("/", createUser); // creates new user
router.get("/", getUsers); // retrieves the users
router.get("/:userId", getUserById); // returns the requested user if exist

module.exports = router;
