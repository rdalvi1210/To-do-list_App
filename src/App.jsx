import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim() === "") {
      setError("Task cannot be empty!");
      return;
    }
    setError("");

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = task;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: task, completed: false }]);
    }
    setTask("");
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const handleEdit = (index) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  return (
    <div className="todo-bg min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="todo-container card shadow-lg p-4 w-100">
        <h2 className="mb-4 text-center text-dark fw-bold">📝 To-Do List</h2>

        <div className="row g-2 mb-3">
          <div className="col-12 col-md-8">
            <input
              type="text"
              className="form-control form-control-lg input-glow"
              placeholder="Enter your task..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-grid">
            <button
              className={`btn btn-lg ${
                editIndex !== null ? "btn-warning" : "btn-primary"
              }`}
              onClick={handleAddTask}
            >
              {editIndex !== null ? "Update Task" : "Add Task"}
            </button>
          </div>
        </div>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <ul className="list-group mt-3">
          {tasks.length === 0 ? (
            <li className="list-group-item text-center text-muted">
              No tasks yet. Add some!
            </li>
          ) : (
            tasks.map((t, index) => (
              <li
                key={index}
                className={`list-group-item d-flex justify-content-between align-items-center task-item px-3 py-3 ${
                  t.completed ? "list-group-item-success" : ""
                }`}
              >
                <div className="form-check d-flex align-items-center">
                  <input
                    type="checkbox"
                    className="form-check-input me-2"
                    checked={t.completed}
                    onChange={() => toggleComplete(index)}
                    id={`task-${index}`}
                  />
                  <label
                    className={`form-check-label mb-0 ${
                      t.completed
                        ? "text-decoration-line-through text-muted"
                        : "text-dark"
                    }`}
                    htmlFor={`task-${index}`}
                  >
                    {t.text}
                  </label>
                </div>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() => handleEdit(index)}
                    title="Edit"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default App;
