const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errorConstructors/UnauthorizedError");
// const { UNAUTHORIZED } = require("../utils/errors");

// const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    // res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
    next(new UnauthorizedError("You are not authorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    // switched from "dev-secret" to JWT_secret
    payload = jwt.verify(token, "dev-secret");
  } catch (err) {
    // res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
    next(new UnauthorizedError("You are not authorized"));
  }
  req.user = payload;
  next();
};

module.exports = { auth };
