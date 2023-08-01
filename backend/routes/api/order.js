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
  .get(orderController.getUserOrders);
router
  .route("/:orderId")
  .put(verifyUserRole("admin"), orderController.updateOrderStatus)
  .delete(verifyUserRole("admin"), orderController.deleteOrder);

router.get(
  "/pending",
  verifyUserRole("admin"),
  orderController.getPendingOrders
);

router.get(
  "/confirmed",
  verifyUserRole("admin"),
  orderController.getConfirmedOrders
);

router.get(
  "/delivered",
  verifyUserRole("admin"),
  orderController.getDeliveredOrders
);

module.exports = router;
