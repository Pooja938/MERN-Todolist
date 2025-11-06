import express from "express";
const router = express.Router();

let tasks = []; // temporary storage (we’ll connect DB later)

router.get("/tasks", (req, res) => {
  res.json(tasks);
});

router.post("/tasks", (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

export default router;