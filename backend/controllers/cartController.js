const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      const newCart = new Cart({ user: req.userId, items: [] });
      await newCart.save();
    }

    cart.items.push({ product: productId, quantity });
    const result = await cart.save();

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const cartItem = cart.items.find((item) => item.product == productId);
    if (!cartItem) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    const product = await Product.findById(productId);
    if (quantity > product.stock) {
      return res.status(400).json({ message: "Not enough stock available" });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.json({ message: "Cart item updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating cart item" });
  }
};

// Remove item from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    // Find the user's cart
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Remove the specified product from the cart
    cart.items = cart.items.filter((item) => item.product != productId);
    await cart.save();

    res.json({ message: "Product removed from cart successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

// Get the cart items for the logged-in user
const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product"
    );
    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving cart" });
  }
};

module.exports = {
  addToCart,
  updateCartItem,
  removeFromCart,
  getCart,
};
