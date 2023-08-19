const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleNewUser = async (req, res) => {
  const { username, email, pwd, pwdC } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "email and password are required." });
  if (pwd !== pwdC)
    return res.status(400).json({ message: "password does not match" });
  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email already in use" }); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPwd,
    });

    // Generate JWTs
    const roles = Object.values(newUser.roles).filter(Boolean);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: newUser._id,
          email: newUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );

    const refreshToken = jwt.sign(
      { email: newUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // Store the refreshToken in the user document
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Send the access token and refresh token to the client
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000, // Expiry time in milliseconds
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // Expiry time in milliseconds
    });
    console.log(newUser);
    res.status(201).json({
      message: `New user ${username} created!`,
      email: email,
      username,
      roles,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
