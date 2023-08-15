// routes/admin.js
const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ error: "Permission denied" });
  }
  next();
};

// Apply isAdmin middleware to all routes in this file
router.use(authMiddleware.authenticate, isAdmin);

// Define admin routes
router.get("/dashboard", function (req, res) {
  adminController.getDashboard(req, res);
});
router.put("/orders/:id", function (req, res) {
  adminController.updateOrderStatus(req, res);
});
// Add more admin-related routes

module.exports = router;
