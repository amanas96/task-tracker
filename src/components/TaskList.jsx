import React, { useState, useEffect } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import TaskFilter from "./TaskFilter";
import { getTasks, saveTasks } from "../utils/localStorage";
import { toast } from "react-toastify";

function TaskList({ username }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    console.log("loading tasks for username", username);
    const loadedTasks = getTasks(username);
    console.log("Loaded task:", loadedTasks);
    setTasks(loadedTasks);
    setIsLoaded(true);
  }, [username]);

  useEffect(() => {
    if (isLoaded) {
      saveTasks(username, tasks);
      console.log("Saving task:", tasks);
    }
  }, [tasks, username]);

  const addTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setEditingTask(null);
    toast.success("Task added successfully!", { autoClose: 2000 });
  };

  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "pending") {
      return !task.completed;
    }
    return true;
  });

  return (
    <>
      <div className="task-layout">
        <div className="task-dashboard">
          <TaskForm
            onSubmit={editingTask ? updateTask : addTask}
            initialTask={editingTask}
            onCancel={handleCancelEdit}
          />
        </div>
        <div className="task-list-section">
          <TaskFilter
            currentFilter={filter}
            onFilterChange={setFilter}
            allCount={tasks.length}
            completedCount={tasks.filter((t) => t.completed).length}
            pendingCount={tasks.filter((t) => !t.completed).length}
          />

          {filteredTasks.length === 0 && (
            <p className="no-tasks-message">
              {filter === "all" &&
                "No tasks yet! Add a new task to get started."}
              {filter === "completed" && "No completed tasks."}
              {filter === "pending" && "No pending tasks."}
            </p>
          )}

          <ul className="task-list">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TaskList;
