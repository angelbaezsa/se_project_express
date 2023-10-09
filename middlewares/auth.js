/* eslint-disable consistent-return */
const jwt = require("jsonwebtoken");

const { JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Issue with header" });
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(401).send({ message: "couldn't retrieve JWT" });
  }
  req.user = payload;
  next();
};

module.exports = { auth };
