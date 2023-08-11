const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

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
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log("ticket:", ticket);
      const payload = ticket.getPayload();
      console.log("payload:", payload);
      const userid = payload["sub"];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    } catch (err) {
      console.error(err);
    }
  }
};

module.exports = verifyJWT;
