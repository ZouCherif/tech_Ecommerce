const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.refresh_token) return res.sendStatus(204); //No content
  const refreshToken = cookies.refresh_token;

  const foundUser = await User.findOne({ refreshToken }).exec();
  res.clearCookie("refresh_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  if (!foundUser) {
    return res.sendStatus(204);
  }

  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.sendStatus(204);
};

module.exports = { handleLogout };
