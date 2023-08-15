// services/productService.js
const Product = require("../models/Product");

class ProductService {
  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(productId) {
    try {
      const product = await Product.findById(productId);
      return product;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(productData) {
    try {
      const product = new Product(productData);
      await product.save();
      return product;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(productId, updatedData) {
    try {
      const product = await Product.findByIdAndUpdate(productId, updatedData, {
        new: true,
      });
      return product;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(productId) {
    try {
      await Product.findByIdAndDelete(productId);
    } catch (error) {
      throw error;
    }
  }

  // Add more methods as needed for product search, filtering, etc.
}

module.exports = new ProductService();
