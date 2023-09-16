const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
} = require("../contollers/clothingItems");

router.post("/", createItem); // creates new item
router.get("/", getItems); // request all items
router.delete("/:itemId", deleteItem); // deletes an item
module.exports = router;
