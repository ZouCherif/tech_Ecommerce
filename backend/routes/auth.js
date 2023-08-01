const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/authController");
const loginLimiter = require("../middlewares/loginLimiter");
const passwordController = require("../../controllers/passwordController");

router.post("/", loginLimiter, handleLogin);
router.post("/forgotPassword", passwordController.forgotPassword);
router.post("/resetPassword/:token", passwordController.resetPassword);

module.exports = router;
