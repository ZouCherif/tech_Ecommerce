const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

const verifyJWT = async (req, res, next) => {
  console.log("verifying JWT");
  if (req.cookies?.access_token) {
    const token = req.cookies.access_token;
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        console.error(err.message);
        return res.sendStatus(403); //invalid token
      }
      req.userId = decoded.UserInfo.id;
      req.email = decoded.UserInfo.email;
      req.roles = decoded.UserInfo.roles;
      next();
    });
  } else if (req.cookies?.google_access_token) {
    const token = req.cookies.google_access_token;
    try {
      const oAuth2Client = new OAuth2Client(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        "postmessage"
      );
      const tokenInfo = await oAuth2Client.getTokenInfo(token);
      const user = await User.findOne({ sub: tokenInfo.sub }).exec();
      if (!user || user.email !== tokenInfo.email)
        return res.status(403).json({ message: "Invalid token" });
      req.userId = user._id;
      req.email = tokenInfo.email;
      req.roles = user.roles;
      next();
    } catch (err) {
      console.error(err);
    }
  } else {
    try {
      await handleRefreshToken(req, res);
      next();
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = verifyJWT;
