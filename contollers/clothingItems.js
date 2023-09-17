const clothingItem = require("../models/clothingItems");
const { INVALID_DATA, NOTFOUND, DEFAULT } = require("../utils/errors");

const createItem = (req, res, next) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((response) => {
      console.log(response);
      res.send({ data: response });
      res.status(201);
    })
    .catch((error) => {
      if (error.name === INVALID_DATA.error) {
        res.status(INVALID_DATA.status).send({ message: INVALID_DATA.error });
      } else {
        next(error);
      }
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((response) => {
      res.send(response);
      res.status(202);
    })
    .catch((error) => {
      console.log(`Error while getting item${error}`);
      res.status(500);
      next(error);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndDelete(itemId)
    .then((response) => {
      res.send(response);
      res.status(204);
    })
    .catch((error) => {
      if (error.name === NOTFOUND.error) {
        res.status(NOTFOUND.status).send({ message: NOTFOUND.error });
      } else {
        next(error);
      }
    });
};

const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((response) => {
      if (response !== null) {
        res.status(200).send({ data: response });
      } else {
        console.log(DEFAULT.status);
        res.send(DEFAULT.error);
      }
    })
    .catch((error) => {
      if (error) {
        res.status(DEFAULT.status).send(DEFAULT.error);
      }
    });
};

const disLikeItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findByIdAndUpdate(
      itemId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((item) => {
      if (!item) {
        res.status(NOTFOUND.error).send(NOTFOUND.status);
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === INVALID_DATA.error) {
        res.status(INVALID_DATA.error).send(INVALID_DATA.status);
      } else {
        res.status(DEFAULT.error).send(DEFAULT.status);
      }
    });
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
