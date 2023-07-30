// controllers/orderController.js
const Order = require("../models/Order");

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod, totalAmount } = req.body;

    const newOrder = await Order.create({
      user: req.userId,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount,
    });

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

// Get all orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate(
      "products.product",
      "_id name price"
    );
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving user orders" });
  }
};

const updateOrder = async (req, res) => {
  try {
    const { orderId, ...updatedFields } = req.body;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "confirmed") {
      return res
        .status(403)
        .json({ message: "Cannot update a confirmed order" });
    }

    // Check if the order belongs to the logged-in user
    if (order.user.toString() !== req.userId && !req.roles.includes("admin")) {
      return res
        .status(403)
        .json({ message: "Unauthorized to update this order" });
    }

    Object.assign(order, updatedFields);
    await order.save();

    res.json({ message: "Order details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order details" });
  }
};

// Delete an order (admin only for confirmed orders)
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "confirmed" && req.roles.includes("admin")) {
      await order.remove();
      return res.json({ message: "Order deleted successfully" });
    }

    if (order.status === "confirmed") {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete a confirmed order" });
    }

    // Check if the order belongs to the logged-in user
    if (order.user.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this order" });
    }

    await order.remove();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrder, deleteOrder };
