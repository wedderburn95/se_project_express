const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const userRouter = require("./routes/users");

const app = express();
const { PORT = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((e) => console.error(e));

app.use(express.json());
app.use("/", mainRouter);
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: err.message });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format" });
  }
  res.status(500).send({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// app.use((req, res) => {
//   res.status(404).send({ message: "Route not found" });
// });
