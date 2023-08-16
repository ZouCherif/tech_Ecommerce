const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { OAuth2Client } = require("google-auth-library");

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
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
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
    res.json({ message: "successfully loged in" });
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
    const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
    const decoded = jwt_decode(tokens.id_token);
    const user = await User.findOne({ email: decoded.email }).exec();
    if (!user) {
      const result = await User.create({
        email: decoded.email,
        username: decoded.name,
        refreshToken: tokens.refresh_token,
        sub: decoded.sub,
      });
    }
    res.cookie("google_access_token", tokens.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000, // 59 minutes
    });
    res.cookie("google_refresh_token", tokens.refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ message: "logged in successfully" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = { handleLogin, handleGoogleAuth };
