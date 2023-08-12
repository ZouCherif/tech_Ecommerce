const express = require("express");
const router = express.Router();
const {
  handleRefreshToken,
  handleGoogleRefreshToken,
} = require("../controllers/refreshTokenController");
const verifyJWT = require("../middlewares/verifyJWT");

router.get("/", handleRefreshToken);
// router.get("/google/refreshToken", handleGoogleRefreshToken);

module.exports = router;
