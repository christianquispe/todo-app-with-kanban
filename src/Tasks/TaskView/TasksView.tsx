import { useState } from "react";
import TaskList from "../TasksList/TasksList";
import { useTasks } from "../context/TaskProvider";
import "./styles.css";
import { TaskUpdateForm } from "../TaskUpdateForm";

export default function TaskView() {
  const [taskToEditId, setTaskToEditId] = useState<string | null>(null);
  const { tasks, updTask, getTask } = useTasks();

  const taskToEdit = getTask(taskToEditId ?? "");

  return (
    <section className="TasksView">
      <div className="container-tasks-app">
        <h2>Welcome back, Johan</h2>
        <p>You've got {tasks.length} tasks up in the nexts days.</p>
        <div className="tasks-edit-form-wrapper">
          <div className="task-list-wrapper">
            <TaskList
              onSelect={(id) => {
                if (id !== taskToEditId) {
                  setTaskToEditId(id);
                } else {
                  setTaskToEditId(!taskToEditId ? id : null);
                }
              }}
            />
          </div>
          {taskToEditId && (
            <div className="task-form-container">
              <div className="task-form-header">
                <h3>Edit your task</h3>
                <span
                  className="close-btn"
                  onClick={() => setTaskToEditId(null)}
                >
                  Close X
                </span>
              </div>
              {taskToEdit && taskToEditId && (
                <TaskUpdateForm
                  defaultValues={taskToEdit}
                  onSubmit={(values) => {
                    updTask(taskToEditId, { ...values });
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
