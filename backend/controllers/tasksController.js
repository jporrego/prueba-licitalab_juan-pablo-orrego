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
    const existingCategory = await Category.findOne({
      name: req.body.name,
    }).exec();
    if (existingCategory !== null) {
      res.sendStatus(409);
    } else {
      let category = new Category({
        name: req.body.name,
      });
      category.save();
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};

exports.task_edit = async function (req, res, next) {
  try {
    await Task.findOneAndUpdate(
      { _id: req.params.id },
      { dueDate: new Date(req.body.date) }
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
