const express = require("express");
const router = express.Router();
const {
  handleRefreshToken,
  handleGoogleRefreshToken,
} = require("../controllers/refreshTokenController");

router.get("/", handleRefreshToken);
// router.get("/google/refreshToken", handleGoogleRefreshToken);

module.exports = router;
