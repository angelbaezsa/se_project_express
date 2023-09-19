const user = require("../models/users");
const { INVALID_DATA, NOTFOUND, DEFAULT } = require("../utils/errors");

const createUser = (req, res, next) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((response) => {
      // console.log(response);
      res.status(201);
      res.send(response);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
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

const getUserById = (req, res, next) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .then((response) => {
      if (response !== null) {
        res.status(200).send({ response });
      } else {
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
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

const deleteUser = (req, res, next) => {
  const { userId } = req.params;
  user
    .findByIdAndDelete(userId)
    .then((response) => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

module.exports = { createUser, getUsers, deleteUser, getUserById };
