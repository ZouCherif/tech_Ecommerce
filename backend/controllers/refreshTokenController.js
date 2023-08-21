const User = require("../models/User");
const jwt = require("jsonwebtoken");
// const { UserRefreshClient } = require("google-auth-library");

const handleRefreshToken = async (req, res) => {
  const refreshToken = req.cookies?.refresh_token;
  if (!refreshToken) return res.sendStatus(401);

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) return res.sendStatus(403); //Forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email) return res.sendStatus(403);
    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser._id,
          email: foundUser.email,
          username: foundUser.username,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 59 * 60 * 1000, // Expiry time in milliseconds
    });
    res.json({ message: "Access token refreshed successfully." });
  });

  //  else if (cookies?.google_refresh_token) {
  //   const refreshToken = cookies.google_refresh_token;
  //   try {
  //     const user = new UserRefreshClient(
  //       process.env.GOOGLE_CLIENT_ID,
  //       process.env.GOOGLE_CLIENT_SECRET,
  //       refreshToken
  //     );
  //     const { credentials } = await user.refreshAccessToken();
  //     res.cookie("google_access_token", credentials.access_token, {
  //       httpOnly: true,
  //       secure: true,
  //       sameSite: "None",
  //       maxAge: 59 * 60 * 1000, // 59 minutes
  //     });
  //     res.json(credentials);
  //   } catch (err) {
  //     res.json({ error: err });
  //   }
  // }
};

module.exports = { handleRefreshToken };
