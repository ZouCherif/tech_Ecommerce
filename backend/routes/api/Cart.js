const express = require("express");
const router = express.Router();
const cartController = require("../../controllers/cartController");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT);

router.route("/").get(cartController.getCart).post(cartController.addToCart);

router
  .route("/:productId")
  .put(cartController.updateCartItem)
  .delete(cartController.removeFromCart);

module.exports = router;
