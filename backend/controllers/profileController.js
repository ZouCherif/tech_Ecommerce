const User = require("../models/User");

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const email = req.email;
    const user = await User.findOne({ email }).select(
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
    const userId = req.params.id;
    const { fistName, lastName, username, phoneNumber, address } = req.body;
    const updatedFields = {
      fistName,
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
