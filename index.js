const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const connectDB = require("./src/lib/db");
const userRouter = require("./src/router/UserRouter");
const uncomplete = require("./src/router/uncomplete_task router/uncomplete");
const complete = require("./src/router/complete_task router/complete");
const todos = require("./src/router/todos router/todos");
const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/user", userRouter);
app.use("/uncomplete", uncomplete);
app.use("/complete", complete);
app.use("/todos", todos);

mongoose.connection.once("open", () => {
  console.log("MongoDB connected!");
  app.listen(4200, () => console.log("Listening to http://localhost:4200"));
});

module.exports = app;
