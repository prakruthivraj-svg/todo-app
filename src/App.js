import { useState, useEffect } from "react";

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
    if(task.trim() === " ") return;
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

      <div style={{marginBottom: "15px"}}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")} style={{marginLeft: "5px"}}>Completed</button>
        <button onClick={() => setFilter("pending")} style={{marginLeft: "5px"}}>Pending</button>
      </div>

      <ul>
        {filteredTasks.map((task, index) => (
        <li
        key={index}
        style={{
        textDecoration: task.completed ? "line-through" : "none",
        cursor: "pointer",
        marginBottom: "8px"
      }}
    >
        {editIndex === index ? (
        <>
          <input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button
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
            onClick={() =>
              setTasks(
                tasks.map((t, i) =>
                  i === index
                    ? { ...t, completed: !t.completed }
                    : t
                )
              )
            }
          >
            {task.text}
          </span>

          <button
            onClick={() => {
              setEditIndex(index);
              setEditText(task.text);
            }}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() =>
              setTasks(tasks.filter((_, i) => i !== index))
            }
            style={{ marginLeft: "5px" }}
          >
            Delete
          </button>
        </>
      )}
    </li>
  ))}
</ul>

</div>
  )
}
export default App;
