const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, totalAmount, note } = req.body;
    const newOrder = await Order.create({
      user: req.userId,
      products,
      shippingAddress,
      totalAmount,
      note,
    });
    // Update product stock levels
    for (const { product: productId, quantity } of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Check if there is enough stock to fulfill the order
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Not enough stock available for product ${product.name}`,
        });
      }

      // Update the product stock level
      product.stock -= quantity;
      await product.save();
    }

    res.json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error placing order" });
  }
};

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
    const { orderId, products, ...updatedFields } = req.body;

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

    for (const { product: productId, quantity } of products) {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${productId} not found` });
      }

      // Calculate the difference in quantity between the updated order and the original order
      const originalQuantity = order.products.find((item) =>
        item.product.equals(productId)
      ).quantity;
      const quantityDifference = quantity - originalQuantity;

      // Check if there is enough stock to fulfill the updated order
      if (quantityDifference > product.stock) {
        return res.status(400).json({
          message: `Not enough stock available for product ${product.name}`,
        });
      }

      // Update the product stock level
      product.stock -= quantityDifference;
      await product.save();
    }

    res.json({ message: "Order details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order details" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findOne({ _id: orderId }).populate(
      "products.product"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.status === "confirmed" && req.roles.includes("admin")) {
      // Restore product stock levels
      for (const {
        product: { _id, stock },
        quantity,
      } of order.products) {
        const updatedStock = stock + quantity;
        await Product.findByIdAndUpdate(_id, { stock: updatedStock });
      }

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

    // Restore product stock levels
    for (const {
      product: { _id, stock },
      quantity,
    } of order.products) {
      const updatedStock = stock + quantity;
      await Product.findByIdAndUpdate(_id, { stock: updatedStock });
    }

    await order.remove();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrder, deleteOrder };
