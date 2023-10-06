const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../contollers/clothingItems");

router.post("/", auth, createItem); // creates new item
router.get("/", getItems); // request all items
router.delete("/:itemId", auth, deleteItem); // deletes an item
// routes to like cards
router.put("/:itemId/likes", auth, likeItem);
router.delete("/:itemId/likes", auth, disLikeItem);

module.exports = router;
