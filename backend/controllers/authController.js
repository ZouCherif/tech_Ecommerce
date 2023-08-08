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
    console.log(result);
    console.log(roles);

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

    // Send authorization roles and access token to user
    res.sendStatus(200);
  } else {
    res.status(401).json({ message: "Invalid password" });
  }
};

const handleGoogleAuth = async (req, res) => {
  // const credentialResponse = req.body;
  // if (!credentialResponse)
  //   return res.status(400).json({ message: "Invalid credentials" });
  // try {
  //   const credentials = jwt_decode(credentialResponse.credential);
  //   console.log(credentials);
  //   const user = await User.findOne({ email: credentials.email }).exec();
  //   console.log(user);
  //   if (!user) {
  //     const result = await User.create({
  //       email: credentials.email,
  //       username: credentials.name,
  //     });
  //     console.log(result);
  //     res
  //       .status(201)
  //       .json({ message: `new user ${credentials.name} registred` });
  //   }
  // } catch (err) {
  //   res.status(404).json({ error: err.message });
  // }

  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "postmessage"
  );
  const { tokens } = await oAuth2Client.getToken(req.body.code); // exchange code for tokens
  console.log(tokens);
  const decoded = jwt_decode(tokens.id_token);
  console.log(decoded);

  res.json(tokens);
};

module.exports = { handleLogin, handleGoogleAuth };
