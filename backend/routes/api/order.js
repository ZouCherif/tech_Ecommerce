// routes/api/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT); // Protect all order routes with JWT authentication

router
  .route("/")
  .post(orderController.placeOrder)
  .get(orderController.getUserOrders)
  .put(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
