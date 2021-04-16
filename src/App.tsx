import React, { useState, useRef } from "react";

type formElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
}

function App() {
  const [newTask, setNewTask] = useState("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: formElement): void => {
    e.preventDefault();
    addTask(newTask);
    setNewTask("");
  };

  const removeTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks.splice(i, 1);
    setTasks(newTasks);
  };

  const toggleDoneTask = (i: number): void => {
    const newTasks: ITask[] = [...tasks];
    newTasks[i].done = !newTasks[i].done;
    setTasks(newTasks);
  };

  const addTask = (name: string): void => {
    if (name === "") {
      return;
    }
    const task: ITask[] = [...tasks, { name: name, done: false }];
    setTasks(task);
    taskInput.current?.focus();
  };

  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              onChange={(e) => setNewTask(e.target.value)}
              value={newTask}
              className="form-control"
              autoFocus
              ref={taskInput}
            />
            <button className="btn btn-success btn-block mt-2">Save</button>
          </form>
          {tasks.map((t: ITask, i: number) => {
            return (
              <div
                className="d-flex align-items-center card card-body mt-2"
                key={i}
              >
                <h2 style={{ textDecoration: t.done ? "line-through" : "" }}>
                  {t.name}
                </h2>
                <div>
                  <button
                    className="btn btn-secondary mr-4"
                    onClick={() => toggleDoneTask(i)}
                  >
                    {t.done ? "✓" : "✗"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeTask(i)}
                  >
                    🗑
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
