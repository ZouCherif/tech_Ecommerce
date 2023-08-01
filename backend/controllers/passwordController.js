// controllers/userController.js
const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const generateToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

const sendResetPasswordEmail = async (email, token) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your_email@gmail.com",
      pass: "your_email_password",
    },
  });

  const mailOptions = {
    from: "your_email@gmail.com",
    to: email,
    subject: "Password Reset Request",
    html: `<p>Please click the following link to reset your password: <a href="http://your_website/resetPassword/${token}">Reset Password</a></p>`,
  };

  await transporter.sendMail(mailOptions);
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token and set expiration time (e.g., 1 hour)
    const resetToken = generateToken();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset password email
    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error sending reset password email" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Check if the token is not expired
    });

    if (!user) {
      return res.status(404).json({ message: "Invalid or expired token" });
    }

    // Reset token is valid, so update the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

module.exports = { forgotPassword, resetPassword };
