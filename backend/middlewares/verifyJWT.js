const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  console.log("verifying JWT");
  const token = req.cookies.access_token;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }
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
