const express = require("express");
const { generateTasks, updateTask  } = require("../controllers/generateTask");

const router = express.Router();

router.post("/generate-tasks", generateTasks);
router.put("/update-tasks/:taskId", updateTask);


module.exports = router;
