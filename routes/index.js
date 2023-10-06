const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../contollers/users");

const { NOTFOUND } = require("../utils/errors");

router.post("/signin", login); // route to login
router.post("/signup", createUser); // sign up route

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use((req, res, next) => {
  res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
});

module.exports = router;
