const router = require("express").Router();
const { auth } = require("../middlewares/auth");

const {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  disLikeItem,
} = require("../contollers/clothingItems");
const { validateCard, validateId } = require("../middlewares/validation");

router.post("/", auth, validateCard, createItem); // creates new item
router.get("/", getItems); // request all items
router.delete("/:itemId", auth, validateId, deleteItem); // deletes an item
// routes to like cards
router.put("/:itemId/likes", auth, validateId, likeItem);
router.delete("/:itemId/likes", auth, validateId, disLikeItem);

module.exports = router;
