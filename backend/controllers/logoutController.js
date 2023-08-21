const User = require("../models/User");

const handleLogout = async (req, res) => {
  const refreshToken = req.cookies.refresh_token;
  if (!refreshToken) return res.sendStatus(204);
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

  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) {
    return res.sendStatus(204);
  }
  foundUser.refreshToken = "";
  const result = await foundUser.save();
  console.log(result);
  res.sendStatus(204);
};

module.exports = { handleLogout };
