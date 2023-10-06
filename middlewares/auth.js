const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(401).send({ message: "Unauthorized" });
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res.status(401).send({ message: "Unauthorized" });
    }
    req.user = payload;
    next();
  } catch (err) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

module.exports = { auth };
