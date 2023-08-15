const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.getCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.user.userId }).populate(
      "items.product"
    );
    if (!userCart) {
      return res.json({ message: "Cart is empty", cart: null });
    }
    res.json({ cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const productId = req.params.id;
    const userCart = await Cart.findOne({ userId: req.user.userId });

    if (!userCart) {
      const newCart = await Cart.create({ userId: req.user.userId, items: [] });
      userCart = newCart;
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    const cartItem = userCart.items.find((item) =>
      item.product.equals(productId)
    );
    if (cartItem) {
      cartItem.quantity += 1;
    } else {
      userCart.items.push({ product: productId, quantity: 1 });
    }

    await userCart.save();
    res.json({ message: "Item added to cart successfully", cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const { quantity } = req.body;

    const userCart = await Cart.findOne({ userId: req.user.userId });
    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = userCart.items.find((item) =>
      item.product.equals(productId)
    );
    if (!cartItem) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    cartItem.quantity = quantity;
    await userCart.save();
    res.json({ message: "Cart item updated successfully", cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.removeCartItem = async (req, res) => {
  try {
    const productId = req.params.id;
    const userCart = await Cart.findOne({ userId: req.user.userId });

    if (!userCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    userCart.items = userCart.items.filter(
      (item) => !item.product.equals(productId)
    );
    await userCart.save();
    res.json({
      message: "Item removed from cart successfully",
      cart: userCart,
    });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
