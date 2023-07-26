const express = require("express");
const app = express();
const PORT = process.env.PORT || 3500;
const logger = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");
const corsOptions = require("./middlewares/corsOptions");
const cookieParser = require("cookie-parser");

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/register", require("./routes/register"));

app.all("*", (req, res) => {
  res.status(404);
  res.json({ message: "404 Not Found" });
});

app.use(errorHandler);
app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
