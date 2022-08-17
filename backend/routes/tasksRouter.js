let express = require("express");
let router = express.Router();

let tasks_controller = require("../controllers/tasksController");

/// -------------------------- TASK ROUTES -------------------------- ///

// GET request for list of all tasks.
router.get("/", tasks_controller.task_list);

// POST request for creating task.
router.post("/create", tasks_controller.task_create);

// PUT request to create task.
router.put("/:id/edit", tasks_controller.task_edit);

// POST request to delete category.
router.put("/:id/done", tasks_controller.task_set_done);

module.exports = router;
