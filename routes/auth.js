// routes/auth.js
const express = require("express");
const router = express.Router();

// Import controllers and middleware
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

// Define routes
router.post("/register", (req, res) => {
  authController.register(req, res);
});
router.post("/login", (req, res) => {
  authController.login(req, res);
});
router.get("/profile", (req, res) => {
  authController.getProfile(req, res);
  authMiddleware.authenticate(req, res);
});
// Add more routes as needed

module.exports = router;
