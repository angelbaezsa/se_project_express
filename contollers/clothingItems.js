const clothingItems = require("../models/clothingItems");
const clothingItem = require("../models/clothingItems");
const {
  INVALID_DATA,
  NOTFOUND,
  DEFAULT,
  FORBIDDEN,
} = require("../utils/errors");

const BadRequestError = require("../errorConstructors/BadRequestError");
const ForbiddenError = require("../errorConstructors/ForbiddenError");
const NotFoundError = require("../errorConstructors/NotFoundError");
const DefaultError = require("../errorConstructors/DefaultError");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  clothingItem
    .create({ name, weather, imageUrl, owner: req.user._id })
    .then((response) => {
      // console.log(response);
      res.status(201).send({ data: response });
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Invalid Data"));
        // res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        // res.status(DEFAULT.error).send({ message: DEFAULT.status });
        next(error);
      }
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((response) => {
      // res.status(200).send(response);
      res.send({ response });
    })
    .catch((error) => {
      // console.log(error);
      // res.status(DEFAULT.error).send({ message: DEFAULT.status });
      next(error);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  clothingItem
    .findOne({ _id: itemId })
    .then((response) => {
      if (!response) {
        next(new NotFoundError("Item not found"));
        return null;
      }
      if (String(response.owner) !== req.user._id) {
        // res.status(FORBIDDEN.error).send({ Message: FORBIDDEN.status });
        next(new ForbiddenError("Not enough credentials to delete this item"));
      }
      return clothingItems
        .deleteOne({ _id: itemId })
        .then((resp) => res.send({ resp }))
        .catch(() => {
          next(new DefaultError("Internal server error"));
        });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        // res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
        next(new BadRequestError("Invalid Data"));
      } else {
        // res.status(DEFAULT.error).send({ message: DEFAULT.status });
        next(new DefaultError("Internal server error"));
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
        // res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
        next(new NotFoundError("item not found"));
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        // res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
        next(new BadRequestError("Invalid Data"));
      } else {
        // res.status(DEFAULT.error).send({ message: DEFAULT.status });
        next(new DefaultError("Internal server error"));
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
        // res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
        next(new NotFoundError("item not found"));
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        // res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
        next(new BadRequestError("Invalid Data"));
      } else {
        // res.status(DEFAULT.error).send({ message: DEFAULT.status });
        next(new DefaultError("Internal server error"));
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
