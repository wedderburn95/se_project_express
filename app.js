require("dotenv").config();
const cors = require("cors");

const mongoose = require("mongoose");

const express = require("express");

const { errors } = require("celebrate");

const errorHandler = require("./middlewares/error-handler");

const mainRouter = require("./routes/index");

const { requestLogger, errorLogger } = require("./middlewares/logger");

const app = express();

app.use(requestLofgger); // request logger

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

app.use("/", mainRouter);

app.use(errorLogger); // error logger

app.use(errors()); // celebrate error handler

app.use(errorHandler);

const { errors } = require("celebrate");
const errorHandler = require("./middlewares/error-handler");

app.listen(PORT, () => {
  logger.log(`Listening on port ${PORT}`);
});
