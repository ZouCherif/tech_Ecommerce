// routes/api/orders.js
const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/orderController");
const verifyJWT = require("../../middlewares/verifyJWT");
const verifyUserRole = require("../../middlewares/verifyRole");

router.use(verifyJWT); // Protect all order routes with JWT authentication

router
  .route("/")
  .post(orderController.placeOrder)
  .get(orderController.getUserOrders)
  .put(verifyUserRole("admin"), orderController.updateOrderStatus)
  .delete(verifyUserRole("admin"), orderController.deleteOrder);

module.exports = router;
