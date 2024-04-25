const express = require("express");
const {
  addToCart,
  getCartItems,
  removeCartItem,
} = require("../controller/CartItemController");

const router = express.Router();
router.use(express.json());

router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:cartItemId", removeCartItem);

module.exports = router;
