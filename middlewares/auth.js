const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errorConstructors/UnauthorizedError");
// const { UNAUTHORIZED } = require("../utils/errors");

const { JWT_SECRET, NODE_ENV } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    // res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
    next(new UnauthorizedError("You are not authorized"));
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  const secretKey = NODE_ENV === "production" ? JWT_SECRET : "dev-secret";

  try {
    // switched from "dev-secret" to JWT_secret
    // payload now will use jwt or "dev-secret" depending on the environment"
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    // res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
    next(new UnauthorizedError("You are not authorized"));
  }
  req.user = payload;
  next();
};

module.exports = { auth };
