require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");

const express = require("express");

const { errors: celebrateErrors } = require("celebrate");

const errorHandler = require("./middlewares/errorHandler");

const mainRouter = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(requestLogger); // request logger

app.use(
  cors({
    origin: "https://rnr.pakasak.com", // allow frontend origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // allow specific headers
    credentials: true, // allow cookies and auth headers
  })
);

const { PORT = 3001 } = process.env;

const logger = console;

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.get("/", (req, res) => {
  res.send("API is working!");
});

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    logger.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());

app.use("/", mainRouter);

app.use(errorLogger); // error logger

app.use(celebrateErrors()); // celebrate error handler

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  logger.log(`Listening on port ${PORT}`);
});
