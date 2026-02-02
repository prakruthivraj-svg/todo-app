import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [filter, setFilter] = useState("all");
  const[editIndex, setEditIndex] = useState(null);
  const[editText, setEditText] = useState("");
  const[task, setTask] = useState(" ");
  const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

    const addTask = () => {
    if(task.trim() === "") return;
    setTasks([
      ...tasks, 
      {text: task, completed: false}
    ]);
    setTask(" ");
  };

  const filteredTasks = tasks.filter((task) => {
    if(filter === "completed") return task.completed;
    if(filter === "pending") return !task.completed;
    return true;
  });

  const toggleTask = (index) => {
  const updatedTasks = tasks.map((task, i) =>
    i === index ? { ...task, completed: !task.completed } : task
  );
  setTasks(updatedTasks);
  };

  return(
    <div className= "app">
      <h1>My To-Do-App</h1>

      <div className="input-row">
        <input 
        type="text"
        placeholder="Enter a task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        />

        <button onClick={addTask}>Add</button>
      </div>

      <div className= "filter-btns">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
        <li
        key={index}
        >
        {editIndex === index ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button className="btn-save"
            onClick={() => {
              const updatedTasks = tasks.map((t, i) =>
                i === index ? { ...t, text: editText } : t
              );
              setTasks(updatedTasks);
              setEditIndex(null);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <span
            className={task.completed ? "completed" : ""}
            onClick={() => toggleTask(index)}
            
          >
           {task.text}
          </span>


          <div className="actions">
            <button className="btn-edit" onClick={() => {
              setEditIndex(index);
              setEditText(task.text);
            }}
            >
            Edit
            </button>
          
            <button className="btn-delete" onClick={() =>
              setTasks(tasks.filter((_, i) => i !== index))
            }
            >
            Delete
            </button>
          </div>
        </>
      )}
    </li>
  ))}
</ul>

</div>
  )
}
export default App;
