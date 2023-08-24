const express = require("express");
const router = express.Router();
const { handleRefreshToken } = require("../controllers/refreshTokenController");
const verifyJWT = require("../middlewares/verifyJWT");

router.get("/", handleRefreshToken);

module.exports = router;
