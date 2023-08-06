require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const { logger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");
const User = require("./models/User");

connectDB();
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({ secret: "your-secret-key", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3500/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = User.findOne({ email: profile.emails[0].value }).exec();
        if (!user) {
          // If the user doesn't exist, create a new user in the database
          user = await User.create({
            email: profile.emails[0].value,
            username: profile.displayName,
            googleId: profile.id,
            refreshToken,
          });
        }

        res.cookie("google_id_token", accessToken, {
          httpOnly: true,
          secure: true, // Use HTTPS
          sameSite: "None", // For cross-site requests
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });

        return done(null, profile);
      } catch (e) {
        return done(e, false);
      }
    }
  )
);

app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use("/profile", require("./routes/api/profile"));
app.use("/categories", require("./routes/api/categories"));
app.use("/products", require("./routes/api/products"));
app.use("/cart", require("./routes/api/cart"));
app.use("/order", require("./routes/api/order"));
app.use("/wishlist", require("./routes/api/wishlist"));
app.use("/destinations", require("./routes/api/destinations"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Not Found" });
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
