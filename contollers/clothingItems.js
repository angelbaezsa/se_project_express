const clothingItem = require("../models/clothingItems");
const { INVALID_DATA, NOTFOUND, DEFAULT } = require("../utils/errors");

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
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

const getItems = (req, res, next) => {
  clothingItem
    .find({})
    .then((response) => {
      res.status(200).send(response);
    })
    .catch(() => {
      // console.log(error);
      res.status(DEFAULT.error).send({ message: DEFAULT.status });
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;
  clothingItem
    .findByIdAndDelete(itemId)
    .then((response) => {
      if (response !== null) {
        res.status(200).send({ data: response });
      } else {
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
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
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
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
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      } else {
        res.status(200).send({ data: item });
      }
    })
    .catch((error) => {
      if (error.name === "CastError") {
        res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
      } else if (error.name === "NotFoundError") {
        res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
      } else {
        res.status(DEFAULT.error).send({ message: DEFAULT.status });
      }
    });
};

// .catch((e) => {
//   if (e.name === "ValidationError") {
//     res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
//   } else if (e.name === "NotFoundError") {
//     res.status(NOTFOUND.error).send({ message: NOTFOUND.status });
//   } else {
//     res.status(INVALID_DATA.error).send({ message: INVALID_DATA.status });
//   }
// });

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
};
