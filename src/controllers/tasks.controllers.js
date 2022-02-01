const pool = require("../db.js");

const getAllTasks = async (req, res, next) => {
    const userId = req.user;

    try{
        const allTasks = await pool.query("SELECT * FROM tasks WHERE userid = $1 ORDER BY timestamp asc", [userId]);
        res.json(allTasks.rows);
    } catch(e){
        next(e);
    }
}

const getTask = async (req, res, next) => {
    const userId = req.user;
    const taskId = req.params.id;

    try{
        const allTasks = await pool.query('SELECT * FROM tasks WHERE userid = $1 and id = $2', [userId, taskId]);

        if (allTasks.rows.length === 0){
            return res.status(404).json({message: "Task not found"})
        }

        res.json(allTasks.rows[0]);
    } catch(e){
        next(e);
    }
}

const createTask = async (req, res, next) => {
    const userId = req.user;
    const { title, description } = req.body;

    try{
        const timestamp = new Date();
        const result = await pool.query(
            "INSERT INTO tasks (title, description, userId, timestamp) VALUES ($1, $2, $3, $4) RETURNING *",
            [title, description, userId, timestamp]
        );

        res.json(result.rows[0]);
    } catch(e){
        next(e);
    }

}

const deleteTask = async (req, res, next) => {
    const userId = req.user;
    const taskId = req.params.id;

    try{
        const result = await pool.query('DELETE FROM tasks WHERE userid = $1 and id = $2', [userId, taskId]);

        if (result.rowCount === 0){
            return res.status(404).json({message: "Task not found"})
        }

        res.sendStatus(204);
    } catch(e){
        next(e);
    }
}

const updateTask = async (req, res, next) => {
    const { title, description } = req.body;
    const userId = req.user;
    const taskId = req.params.id;

    try{
        const result = await pool.query(
            "UPDATE tasks SET title = $1, description = $2 WHERE userid = $3 and id = $4 RETURNING *",
            [title, description, userId, taskId]
        );

        if (result.rows.length === 0){
            return res.status(404).json({message: "Task not found"})
        }

        res.json(result.rows[0]);
    } catch(e){
        next(e);
    }
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}