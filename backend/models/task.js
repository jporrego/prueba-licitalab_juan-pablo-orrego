var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
  description: { type: String, required: true, maxLength: 1000 },
  creationDate: { type: Date, ref: "Brand", required: true },
  dueDate: { type: Date, ref: "Category", required: true },
  done: { type: Boolean, required: true },
});

//Export model
module.exports = mongoose.model("Task", TaskSchema);
