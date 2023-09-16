const router = require("express").Router();

const { createUser, getUsers, deleteUser } = require("../contollers/users");

router.post("/", createUser); // creates new user
router.get("/", getUsers); // retrieves the users
router.delete("/:userId", deleteUser); // deletes an user

module.exports = router;
