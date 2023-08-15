// routes/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authMiddleware = require("../middlewares/authMiddleware");

// Apply authentication middleware to all routes in this file
router.use(authMiddleware.authenticate);

// Define order routes
router.get("/", (req, res) => {
  orderController.getOrderHistory(req, res);
});
router.post("/", (req, res) => {
  orderController.placeOrder(req, res);
});
router.get("/:id", (req, res) => {
  orderController.getOrderById(req, res);
});
router.put("/:id", (req, res) => {
  orderController.updateOrderStatus(req, res);
});

module.exports = router;
