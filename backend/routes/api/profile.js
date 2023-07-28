const express = require("express");
const router = express.Router();
const profileController = require("../../controllers/profileController");
const verifyJWT = require("../../middlewares/verifyJWT");

router
  .route("/")
  .get(verifyJWT, profileController.getUserProfile)
  .put(verifyJWT, profileController.updateUserProfile);

module.exports = router;
