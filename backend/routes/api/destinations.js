const express = require("express");
const router = express.Router();
const {
  getDestinations,
  updateDestinationPrice,
} = require("../../controllers/destinationController");
const verifyJWT = require("../../middlewares/verifyJWT");
const verifyUserRole = require("../../middlewares/verifyRole");

router.use(verifyJWT);
router.use(verifyUserRole("admin"));
router.route("/").get(getDestinations).put(updateDestinationPrice);

module.exports = router;
