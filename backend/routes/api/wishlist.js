const express = require("express");
const router = express.Router();
const wishlistController = require("../../controllers/wishlistController");
const verifyJWT = require("../../middlewares/verifyJWT");

router.use(verifyJWT);

router
  .route("/")
  .get(wishlistController.getWishlist)
  .post(wishlistController.addToWishlist)
  .delete(wishlistController.removeFromWishlist);

module.exports = router;
