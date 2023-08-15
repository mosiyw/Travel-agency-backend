const Product = require("../models/Product");
const Order = require("../models/Order");

exports.getDashboard = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();
    res.json({ productCount, orderCount });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    // Check if user is an admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: "Permission denied" });
    }

    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("items.product");

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

// Add more admin-related controller functions as needed
