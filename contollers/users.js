const user = require("../models/users");

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  user
    .create({ name, avatar })
    .then((response) => {
      console.log(response);
      res.status(201);
      res.send(response);
    })
    .catch((error) => {
      console.log(`An error has ocurred creating an user ${error}`);
    });
};

const getUsers = (req, res) => {
  user
    .find({})
    .then((response) => {
      res.status(202);
      res.send(response);
      console.log(response);
    })
    .catch((error) => {
      console.log(`An error has ocurred retrieving the users ${error}`);
    });
};

const deleteUser = (req, res) => {
  const { userId } = req.params;
  user
    .findByIdAndDelete(userId)
    .then((response) => {
      console.log(response);
      res.status(204).send(response);
    })
    .catch((error) => {
      console.log(`An error has ocurred deleting the user ${error}`);
    });
};

module.exports = { createUser, getUsers, deleteUser };
