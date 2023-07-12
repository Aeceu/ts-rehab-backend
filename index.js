const express = require('express')
const cors = require('cors');
const connectDB = require("./src/lib/db");
const tasksRouter = require("./src/router/taskRouter")
const userTasksRouter = require("./src/router/userTasksRouter")

const app = express()

app.use(express.json())
app.use(cors())

connectDB();

app.use("/user",tasksRouter)
app.use("/user/tasks",userTasksRouter);

app.listen(4200, ()=>console.log("Listening to http://localhost:4200"))
