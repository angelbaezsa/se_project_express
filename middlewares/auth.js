const jwt = require("jsonwebtoken");
const { UNAUTHORIZED } = require("../utils/errors");

// const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, "dev-secret");
  } catch (err) {
    res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
  }
  req.user = payload;
  next();
};

module.exports = { auth };
