let express = require("express");
let router = express.Router();

// Require controller modules.
let tasks_controller = require("../controllers/tasksController");

/// ITEM ROUTES ///

/// -------------------------- CATEGORY ROUTES -------------------------- ///

// GET request for list of all categorys.
router.get("/", tasks_controller.task_list);

// POST request for creating category.
router.post("/create", tasks_controller.task_create);

// POST request to delete category.
router.put("/:id/edit", tasks_controller.task_edit);

module.exports = router;
