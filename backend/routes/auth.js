const express = require("express");
const router = express.Router();
const { handleLogin } = require("../controllers/authController");
const loginLimiter = require("../middlewares/loginLimiter");
const passwordController = require("../controllers/passwordController");

router.post("/", loginLimiter, handleLogin);
router.post("/forgotPassword", passwordController.forgotPassword);
router.post("/resetPassword/:token", passwordController.resetPassword);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  // Redirect to a success or dashboard page after successful authentication.
  res.redirect("/");
});

module.exports = router;
