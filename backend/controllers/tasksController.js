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
    const existingItems = await Item.find({
      category: req.params.id,
    }).exec();

    if (existingItems.length > 0) {
      //throw new Error("Can't delete this category because other documents reference it.");
      res.status(409).json({
        message: "Can't delete this category because other items reference it.",
      });
    } else {
      await Category.deleteOne({ _id: req.params.id });
      res.end();
    }
  } catch (error) {
    return next(error);
  }
};

exports.task_set_done = async function (req, res, next) {
  try {
    console.log(req.body.tasks);
    req.body.tasks.forEach(async (task) => {
      await Task.findOneAndUpdate({ _id: task }, { done: true });
    });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};
