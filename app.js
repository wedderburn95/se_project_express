require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");

const express = require("express");
const auth = require("./middlewares/auth");
const authRouter = require("./routes/auth");
const mainRouter = require("./routes/index");

const app = express();

app.use(cors());

const { PORT = 3001 } = process.env;

const { statusCodes } = require("./utils/config");

const logger = console;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    logger.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

app.use("/", authRouter);

app.use((req, res, next) => {
  req.user = { _id: "5d8b8592978f8bd833ca8133" }; // Use a valid user _id from your DB
  next();
});

// Allow signup and signin without auth

// Require token for all routes below
app.use(auth);

app.use("/", mainRouter);

app.use((err, req, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "An error has occurred on the server" });
  }
  if (err.name === "CastError") {
    return res
      .status(statusCodes.BAD_REQUEST)
      .send({ message: "Invalid ID format" });
  }
  return res
    .status(statusCodes.INTERNAL_SERVER_ERROR)
    .send({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  logger.log(`Listening on port ${PORT}`);
});
