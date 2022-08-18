var Task = require("../models/task");

var async = require("async");

// Display inventory.
exports.task_list = async (req, res, next) => {
  try {
    const result = await Task.find();
    console.log(result);
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.task_create = async function (req, res, next) {
  try {
    const task = new Task({
      description: req.body.description,
      creationDate: new Date(),
      dueDate: req.body.date,
      done: false,
    });
    await task.save();
    res.sendStatus(200);
  } catch (error) {
    return next(error);
  }
};

exports.task_edit_description = async function (req, res, next) {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { description: req.body.description }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.task_edit_date = async function (req, res, next) {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { dueDate: new Date(req.body.date + "T00:00:00") }
    );
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

exports.task_set_done = async function (req, res, next) {
  try {
    req.body.tasks.forEach(async (task) => {
      await Task.findOneAndUpdate({ _id: task }, { done: true });
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
