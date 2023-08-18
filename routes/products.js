const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const productService = require("../services/productService");

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

router.post(
  "/",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.createProduct(req, res);
  }
);

router.put(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.updateProduct(req, res);
  }
);

router.delete(
  "/:id",
  authMiddleware.authenticate,
  authMiddleware.isAdmin,
  (req, res) => {
    productController.deleteProduct(req, res);
  }
);

module.exports = router;
