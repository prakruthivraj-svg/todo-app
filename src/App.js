import { useState, useEffect } from "react";

function App() {
  const[task, setTask] = useState(" ");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if(task.trim() === " ") return;
    setTasks([
      ...tasks, 
      {text: task, completed: false}
    ]);
    setTask(" ");
  };
  return(
    <div style={{padding: "20px"}}>
      <h1>My To-Do-App</h1>

      <input 
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={addTask}>Add</button>

      <ul>
        {tasks.map((task, index) => ( 
          <li 
          key = {index}
          onClick={() => 
            setTasks(
              tasks.map((t,i) => 
                i === index ? { ...t, completed: !t.completed } : t
            )
          )}
         
          style={{
          textDecoration: task.completed ? "line-through" : "none",
          cursor: "pointer"
         }}         
        >{task.text}
            <button onClick={(e) => {
            e.stopPropagation();
            setTasks(tasks.filter((_, i) => i !== index));
        }}
        style={{ marginLeft: "10px" }}
        >Delete
        </button>
      </li>  
      ))}
    </ul>
    </div>
  )
}
export default App;
