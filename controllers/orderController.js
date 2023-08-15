const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.getOrderHistory = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.userId });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user.userId }).populate(
      "items.product"
    );
    if (!userCart || userCart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    const orderItems = userCart.items.map((item) => ({
      product: item.product,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const order = await Order.create({
      userId: req.user.userId,
      items: orderItems,
      totalAmount,
      status: "pending", // Set the initial status as pending
    });

    // Clear the user's cart after placing the order
    userCart.items = [];
    await userCart.save();

    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("items.product");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json({ order });
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
