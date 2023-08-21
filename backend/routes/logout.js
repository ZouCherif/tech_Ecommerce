const express = require("express");
const router = express.Router();
const { handleLogout } = require("../controllers/logoutController");
const verifyJWT = require("../middlewares/verifyJWT");

router.get("/", handleLogout);

module.exports = router;
