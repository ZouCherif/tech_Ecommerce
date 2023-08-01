const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Destination = require("../models/Destination");

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

    price = product.price;

    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) {
      const newCart = new Cart({ user: req.userId, items: [] });
      await newCart.save();
    }

    cart.items.push({ product: productId, quantity, price });
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
    const { destination } = req.query; // Assuming destination is passed as a query parameter

    const cart = await Cart.findOne({ user: req.userId }).populate(
      "items.product",
      "_id name price"
    );

    if (!cart) {
      return res.status(200).json({ message: "Cart is empty." });
    }

    let totalPrice = 0;
    cart.items.forEach((item) => {
      totalPrice += item.quantity * item.price;
    });

    // Look up the delivery price for the destination city from the database
    const city = await Destination.findOne({ name: destination }); // Assuming 'City' model has a 'name' field for city names and a 'deliveryPrice' field for the delivery price

    if (!city) {
      return res.status(400).json({ message: "Invalid destination city." });
    }

    // Calculate the total amount including the delivery price
    const totalAmount = totalPrice + city.price;

    res.json({ cart, totalPrice, totalAmount });
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
