// services/orderService.js
const Order = require("../models/Order");
const Product = require("../models/Product");

class OrderService {
  async createOrder(userId, cartItems) {
    try {
      // Calculate total amount based on cart items
      const totalAmount = await this.calculateTotalAmount(cartItems);

      // Create a new order
      const order = new Order({
        userId,
        items: cartItems,
        totalAmount,
        status: "pending", // You can set an initial status
      });

      await order.save();
      return order;
    } catch (error) {
      throw error;
    }
  }

  async calculateTotalAmount(cartItems) {
    let total = 0;
    for (const cartItem of cartItems) {
      const product = await Product.findById(cartItem.product);
      if (product) {
        total += product.price * cartItem.quantity;
      }
    }
    return total;
  }

  async getOrderById(orderId) {
    try {
      const order = await Order.findById(orderId);
      return order;
    } catch (error) {
      throw error;
    }
  }

  // Add more methods as needed for updating order status, fetching user orders, etc.
}

module.exports = new OrderService();
