const Order = require("../models/Order");
const Product = require("../models/Product");

const placeOrder = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      products,
      city,
      municipal,
      address,
      totalAmount,
      note,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !phoneNumber ||
      !address ||
      !city ||
      !municipal
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all the required information" });
    }

    const newOrder = await Order.create({
      user: req.userId,
      products,
      shippingAddress: {
        address,
        city,
        municipal,
      },
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

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!status) return res.status(404).json({ message: "status is required" });

    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();
    res.json({ message: "Order details updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating order details" });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.body;

    // Find the order
    const order = await Order.findOne({ _id: orderId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    for (const item of order.products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res
          .status(404)
          .json({ message: `Product with ID ${item.product} not found` });
      }

      product.stock += item.quantity;
      await product.save();
    }

    await order.remove();

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting order" });
  }
};

module.exports = { placeOrder, getUserOrders, updateOrderStatus, deleteOrder };
