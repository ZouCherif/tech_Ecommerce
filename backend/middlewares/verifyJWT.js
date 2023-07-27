const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  console.log("verifying JWT");
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  // const token = req.cookies.jwt;
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
    req.email = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
