const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { OAuth2Client } = require("google-auth-library");

const generateTokens = (id, email, username, roles) => {
  const accessToken = jwt.sign(
    {
      UserInfo: {
        id,
        email,
        username,
        roles,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "59m" }
  );
  const refreshToken = jwt.sign({ email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });

  return { accessToken, refreshToken };
};

const handleLogin = async (req, res) => {
  const { email, pwd } = req.body;
  if (!email || !pwd)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser) return res.status(401).json({ message: "User not found" }); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // create JWTs
    const { accessToken, refreshToken } = generateTokens(
      foundUser._id,
      foundUser.email,
      foundUser.username,
      roles
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000, // 59 minutes
      domain: "localhost",
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
      domain: "localhost",
    });
    res.json({
      message: "successfully loged in",
      accessToken,
    });
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

const handleGoogleAuth = async (req, res) => {
  if (!req.body.code) return res.status(401).json({ message: "Invalid code" });
  try {
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      "postmessage"
    );
    const { tokens } = await oAuth2Client.getToken(req.body.code);
    const decoded = jwt_decode(tokens.id_token);
    let user = await User.findOne({ email: decoded.email }).exec();
    if (!user) {
      user = await User.create({
        email: decoded.email,
        username: decoded.name,
      });
    }
    const { accessToken, refreshToken } = generateTokens(
      user._id,
      user.email,
      user.username,
      user.roles
    );

    user.refreshToken = refreshToken;
    const result = await user.save();

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000, // 59 minutes
    });
    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({
      message: "successfully loged in",
      accessToken,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { handleLogin, handleGoogleAuth };
