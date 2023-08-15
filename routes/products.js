// routes/products.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController"); // Import the productController module
const authMiddleware = require("../middlewares/authMiddleware");
const productService = require("../services/productService"); // Import the productService

// Define product routes
router.get("/", async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Error fetching products" });
  }
});

router.get("/:id", (req, res) => {
  productController.getProductById(req, res);
});
router.post("/", (req, res) => {
  productController.createProduct(req, res);
  authMiddleware.isAdmin(req, res);
});
router.put("/:id", (req, res) => {
  productController.updateProduct(req, res);
  authMiddleware.isAdmin(req, res);
});
router.delete("/:id", (req, res) => {
  productController.deleteProduct(req, res);
  authMiddleware.isAdmin(req, res);
});

module.exports = router;
