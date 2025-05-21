const mongoose = require("mongoose");

const express = require("express");

const app = express();

const mainRouter = require("./routes/index");

const userRouter = require("./routes/users");

const { PORT = 3001 } = process.env;

const { statusCodes } = require("./utils/constants");

const logger = console;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    logger.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

// middleware with req.user
app.use((req, res, next) => {
  req.user = { _id: "6827a4835ddd5516b68eece9" };
  next();
});

app.use("/", mainRouter);
app.use("/users", userRouter);

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
