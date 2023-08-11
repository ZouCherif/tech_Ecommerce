const User = require("../models/User");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  let refreshToken;
  if (cookies?.refresh_token) {
    refreshToken = cookies.refresh_token;
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
  } else if (cookies?.google_refresh_token) {
    refreshToken = cookies.google_refresh_token;
    res.clearCookie("google_refresh_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.clearCookie("google_access_token", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
  } else {
    return res.sendStatus(204);
  }

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
