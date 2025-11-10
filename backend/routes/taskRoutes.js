import express from "express";
import Todo from "../models/todo.js";

const router = express.Router();

// ✅ Get all tasks
router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Todo.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add a new task
router.post("/api/tasks", async (req, res) => {
  try {
    const newTask = new Todo({
      task: req.body.task,
    });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a task
router.delete("/api/tasks/:id", async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;