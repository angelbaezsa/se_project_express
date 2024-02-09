const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { auth } = require("../middlewares/auth");
const { login, createUser } = require("../contollers/users");
const {
  validateUserCreation,
  validateAuth,
} = require("../middlewares/validation");

// const { NOTFOUND } = require("../utils/errors");
const NotFoundError = require("../errorConstructors/NotFoundError");

router.post("/signin", validateAuth, login); // route to login
router.post("/signup", validateUserCreation, createUser); // sign up route

router.use("/items", clothingItem);
router.use("/users", auth, user);

router.use((req, res, next) => {
  // res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
  next(new NotFoundError("Cannot find page requested"));
});

module.exports = router;
