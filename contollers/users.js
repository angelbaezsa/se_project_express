const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const {
  INVALID_DATA,
  NOTFOUND,
  DEFAULT,
  DUPLICATED,
  UNAUTHORIZED,
} = require("../utils/errors");

const { NODE_ENV, JWT_SECRET } = process.env;

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  return bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      user.create({ name, avatar, email, password: hashedPassword }),
    )
    .then((response) => {
      if (response) {
        const userObject = response.toObject();
        delete userObject.password;
        res.status(201).send(userObject);
      }
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else if (error.code === 11000) {
        res.status(DUPLICATED.error).send({ message: DUPLICATED.status });
      } else if (error.code === INVALID_DATA.error) {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return user
    .findOne({ email })
    .select("+password")
    .then((userObject) => {
      if (!userObject) {
        return res
          .status(UNAUTHORIZED.error)
          .send({ message: UNAUTHORIZED.status });
      }
      return bcrypt
        .compare(password, userObject.password)

        .then((matchPassword) => {
          if (!matchPassword) {
            return res
              .status(UNAUTHORIZED.error)
              .send({ message: UNAUTHORIZED.status });
          }
          return res.send({
            token: jwt.sign(
              { _id: userObject._id },
              NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
              {
                expiresIn: "7d",
              },
            ),
          });
        })
        .catch(() => {
          res.status(UNAUTHORIZED.error).send({ message: UNAUTHORIZED.status });
        });
    });
};

const getCurrentUser = (req, res, next) => {
  // const { userId } = req.user._id;

  user
    .findById(req.user._id)
    .then((response) => {
      if (!response) {
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      } else {
        res.status(200).send({ response });
      }
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  user
    .findByIdAndUpdate(
      req.user._id,
      { name, avatar },
      { new: true, runValidators: true },
    )
    .then((userObject) => {
      if (!userObject) {
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      }
      res.status(200).send(userObject);
    })
    .catch((e) => {
      if (e.name === "CastError" || e.name === "ValidationError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

module.exports = { createUser, login, getCurrentUser, updateProfile };
