const mongoose = require("mongoose");
const express = require("express");
const mainRouter = require("./routes/index");

const userRouter = require("./routes/users");

const app = express();
const { PORT = 3001 } = process.env;

const logger = console;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    logger.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

// middleware with req.user

app.use("/", mainRouter);
app.use("/users", userRouter);

app.use((err, req, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format" });
  }
  return res.status(500).send({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  logger.log(`Listening on port ${PORT}`);
});
