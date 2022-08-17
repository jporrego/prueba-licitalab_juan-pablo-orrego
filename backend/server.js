const express = require("express");
const cors = require("cors");
//require("child_process").fork("populatedb.js");

const port = 4050;
var tasksRouter = require("./routes/tasksRouter");

const app = express();

//Set up mongoose connection
var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://admin:1234@cluster0.dkfpngh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;

app.use(cors());
app.use(express.json());

// Route
app.use("/", tasksRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
