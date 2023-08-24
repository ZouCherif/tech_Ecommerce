const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const { handleRefreshToken } = require("../controllers/refreshTokenController");

const verifyJWT = async (req, res, next) => {
  console.log("verifying JWT");
  if (!req.cookies?.access_token)
    return res.status(401).json({ message: "access_token is required" });
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
};

module.exports = verifyJWT;
