const router = require("express").Router();

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../contollers/clothingItems");

router.post("/", createItem); // creates new item
router.get("/", getItems); // request all items
router.delete("/:itemId", deleteItem); // deletes an item
// routes to like cards
router.put("/:itemId/likes", likeItem);
router.delete("/:itemId/likes", disLikeItem);

module.exports = router;
