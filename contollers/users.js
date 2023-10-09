const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const { INVALID_DATA, NOTFOUND, DEFAULT } = require("../utils/errors");

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
        res
          .status(409)
          .send({ message: "Invalid email: Email already in use" });
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
        return res.status(401).send({ message: "Unauthorized" });
      }
      return (
        bcrypt
          .compare(password, userObject.password)
          // eslint-disable-next-line consistent-return
          .then((matchPassword) => {
            if (!matchPassword) {
              return res.status(401).send({ message: "Unauthorized" });
            }
            res.send({
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
            res.status(401).send({ message: "Unauthorized" });
          })
      );
    });
};

const getUsers = (req, res) => {
  user
    .find({})
    .then((response) => {
      res.status(200);
      res.send(response);
      // console.log(response);
    })
    .catch(() => {
      // console.error(error);
      // res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      res.status(DEFAULT.error).send({ message: DEFAULT.status });
    });
};

const getCurrentUser = (req, res, next) => {
  // const { userId } = req.user._id;
  console.log("Get current user got to run");
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
        res.status(401).send({ message: "Unauthorized" });
      }
      res.status(200).send(userObject);
    })
    .catch((e) => {
      if (e.name === "CastError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

// const deleteUser = (req, res, next) => {
//   const { userId } = req.params;
//   user
//     .findByIdAndDelete(userId)
//     .then((response) => {
//       console.log(response);
//       res.status(200).send(response);
//     })
//     .catch((error) => {
//       if (error.name === "ValidationError") {
//         res.status(DEFAULT.error).send({ message: DEFAULT.status });
//       } else {
//         res.status(DEFAULT.error).send({ message: DEFAULT.status });
//       }
//     });
// };

module.exports = { createUser, getUsers, login, getCurrentUser, updateProfile };
