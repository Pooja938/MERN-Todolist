import express from "express";
const router = express.Router();

let tasks = []; // temporary in-memory storage

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask); // ✅ only send the new task, not all tasks
});

router.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  tasks = tasks.filter((task, index) => index != parseInt(id));
  res.json({ message: "Task deleted", tasks });
});

export default router;