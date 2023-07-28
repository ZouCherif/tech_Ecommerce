const User = require("../models/User");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const user = await User.findById(userId).select(
      "-password -refreshToken -active -__v"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { firstName, lastName, username, phoneNumber, address } = req.body;
    const updatedFields = {
      firstName,
      lastName,
      username,
      phoneNumber,
      address,
    };

    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
      select: "-password",
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = { getUserProfile, updateUserProfile };
