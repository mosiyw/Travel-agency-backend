// routes/cart.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

// Define cart routes
router.get("/", (req, res) => {
  cartController.getCart(req, res);
});
router.post("/add/:id", (req, res) => {
  cartController.addToCart(req, res);
});
router.put("/update/:id", (req, res) => {
  cartController.updateCartItem(req, res);
});
router.delete("/remove/:id", (req, res) => {
  cartController.removeCartItem(req, res);
});

module.exports = router;
