const clothingItems = require("../models/clothingItems");
const clothingItem = require("../models/clothingItems");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl })
    .then((response) => {
      console.log(response);
      res.send({ data: response });
      res.status(200);
    })
    .catch((error) => {
      console.log(`Error while adding item${error}`);
      res.status(500);
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((response) => {
      console.log(response);
      res.send(response);
    })
    .catch((error) => {
      console.log(`Error while getting item${error}`);
      res.status(500);
    });
};

const deleteItem = (req, res, next) => {
  const { id } = req.params;
  clothingItems
    .findByIdAndDelete({ _id: id })
    .then((response) => {
      res.send(response);
      res.status(204);
    })
    .catch((error) => {
      console.log(`Error while getting item${error}`);
      res.status(500);
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
};
