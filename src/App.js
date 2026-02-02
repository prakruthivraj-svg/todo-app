import { useState } from "react";

function App() {
  const[task, setTask] = useState(" ");
  const[tasks, setTasks] = useState([]);

  const addTask = () => {
    if(task.trim() === " ") return;
    setTasks([...tasks, task]);
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
          <li key = {index}>{task}
            <button onClick={() => 
              setTasks(tasks.filter((_,i) => i !== index))
            }
             style={{marginLeft: "10px"}}
            >Delete
            </button>
          </li>  
       ))}
      </ul>
    </div>
  )
}
export default App;
