import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch all tasks from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/tasks")
      .then(res => {console.log("Tasks from backend:,res.data");
        console.log("Tasks from backend:",res.data);
        setTasks(res.data);
      })
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  // Add new task
  const addTask = () => {
    if (!newTask.trim()) return;
    axios.post("http://localhost:5000/api/tasks", { title: newTask })
      .then(res => setTasks([...tasks, res.data]))
      .catch(error => console.error("Error adding task:", error));
    setNewTask("");
  };

  // Delete task
  const deleteTask =async (index) => {
    try{
      await
  axios.delete(`http://localhost:5000/api/tasks/${index}`);
  
      // Update the UI immediately after successful delete
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
    }
    catch (error){
      console.error("Error deleting task:", error);
}

    
};

  return (
    <div className="app">
      <h1>📝 To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
     <ul className="task-list">
        {tasks.map((task, index) => (
        <li key={index}>
      {task.title || task.name || JSON.stringify(task)}
      <button onClick={() => deleteTask(index)}>❌</button>
    </li>
  ))}
</ul>
      
      
    </div>
  );
}

export default App;