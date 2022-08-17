let express = require("express");
let router = express.Router();

// Require controller modules.
let tasks_controller = require("../controllers/tasksController");

/// ITEM ROUTES ///

/// -------------------------- CATEGORY ROUTES -------------------------- ///

// GET request for list of all categorys.
router.get("/categories", category_controller.category_list);

// POST request for creating category.
router.post("/category/create", category_controller.category_create_post);

// GET request for one category by name.
router.get("/category/name/:name", category_controller.category_detail_by_name);

// POST request to delete category.
router.post("/category/:id/delete", category_controller.category_delete_post);

// GET request for one category by id.
router.get("/category/:id", category_controller.category_detail);

module.exports = router;
