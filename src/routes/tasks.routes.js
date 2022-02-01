const { Router } = require("express");

const {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask,
} = require("../controllers/tasks.controllers.js");
const authorization = require("../middleware/authorization.js");

const router = Router();


// TASKS ROUTES

router.get("/tasks", authorization, getAllTasks);

router.get("/tasks/:id", authorization, getTask);

router.post("/tasks", authorization, createTask);

router.delete("/tasks/:id", authorization, deleteTask);

router.put("/tasks/:id", authorization, updateTask);

module.exports = router;