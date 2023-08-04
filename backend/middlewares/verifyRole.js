const jwt = require("jsonwebtoken");

const verifyUserRole = (requiredRole) => (req, res, next) => {
  console.log("verifying role...");
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userRole = decodedToken.UserInfo?.roles || [];
    if (!userRole.includes(requiredRole)) {
      return res.status(401).json({ message: "unauthorized" });
    }
    next();
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = verifyUserRole;
