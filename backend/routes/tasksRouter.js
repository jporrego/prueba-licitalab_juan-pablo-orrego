let express = require("express");
let router = express.Router();

let tasks_controller = require("../controllers/tasksController");

/// -------------------------- TASK ROUTES -------------------------- ///

// GET request for list of all tasks.
router.get("/tasks", tasks_controller.task_list);

// POST request for creating task.
router.post("/", tasks_controller.task_create);

// PUT request to edit task date.
router.put("/tasks/:id/description", tasks_controller.task_edit_description);

// PUT request to edit task date.
router.put("/tasks/:id/date", tasks_controller.task_edit_date);

// PUT request to set task as done.
router.put("/tasks/:id/done", tasks_controller.task_set_done);

// DELETE request to delete task.
router.delete("/tasks/:id/", tasks_controller.task_delete);

module.exports = router;
