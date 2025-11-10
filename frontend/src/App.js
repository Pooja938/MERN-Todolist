import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // ✅ Add this line


function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // ✅ Load tasks from backend
  useEffect(() => {
    axios
  .get("https://mern-todo-backend1.onrender.com/api/tasks")
  .then((res) => setTasks(res.data))
  .catch((err) => console.error("Error fetching tasks", err));
  }, []);

  // ✅ Add a new task
  const addTask = async () => {
    if (!task.trim()) return;
    try {
      const res = await axios.post("https://mern-todo-backend1.onrender.com/api/tasks", { task });
      setTasks([...tasks, res.data]);
      setTask("");
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  // ✅ Delete a task
const deleteTask = async (id) => {
  try {
    await axios.delete(`https://mern-todo-backend1.onrender.com/api/tasks/${id}`);
    setTasks(tasks.filter((t) => t._id !== id));
  } catch (err) {
    console.error("Error deleting task:", err);
  }
};

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.task}
            <button onClick={() => deleteTask(t._id)}>❌ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;