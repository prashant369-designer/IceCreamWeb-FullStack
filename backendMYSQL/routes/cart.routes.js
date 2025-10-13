const express = require("express");
const { addToCart, getCart, removeFromCart } = require("../controllers/cart.controllers");

const router = express.Router();

router.post("/", addToCart);           // Add to cart
router.get("/", getCart);              // Get cart items
router.delete("/:id", removeFromCart); // Remove cart item

module.exports = router;
