const router = require("express").Router();
const clothingItem = require("./clothingItems");
const user = require("./users");
const { NOTFOUND } = require("../utils/errors");

const routeNotFound = (req, res, next) => {
  res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
};

router.use("/items", clothingItem);
router.use("/users", user);

router.use(routeNotFound);

module.exports = router;
