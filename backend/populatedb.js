var async = require("async");
var Task = require("./models/task");

var mongoose = require("mongoose");
var mongoDB =
  "mongodb+srv://admin:1234@cluster0.dkfpngh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var tasks = [];

const dropCollections = async (cb) => {
  await db.dropCollection("tasks");
};

function taskCreate(description, dueDate, done, cb) {
  var task = new Task({
    description: description,
    creationDate: new Date(),
    dueDate: dueDate,
    done: done,
  });

  task.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    tasks.push(task);
    cb(null, task);
  });
}

function createTasks(cb) {
  async.series(
    [
      function (callback) {
        taskCreate("Llamar a papá", new Date("25-08-2022"), false, callback);
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [dropCollections, createTasks],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Database populated");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
