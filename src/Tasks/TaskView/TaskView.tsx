import { useState } from "react";
import { useTasks } from "../context/TaskProvider";
import { TaskForm } from "../TaskForm";
import type { TaskFormInputs } from "../TaskForm/TaskForm";
import TaskList from "../TasksList";

export default function TaskView() {
  const [isEditing, setIsEditing] = useState(false);
  const [taskToEditId, setTaskToEditId] = useState("");
  const { addTask } = useTasks();

  const handleSubmit = (values: TaskFormInputs) => {
    addTask({ ...values });
  };

  const handleSelect = (id: string) => {
    setTaskToEditId(id);
    setIsEditing(true);
  };

  return (
    <section className="TaskContainer">
      <TaskList onSelect={handleSelect} />
      {isEditing && taskToEditId && (
        <div className="task-form-container">
          <TaskForm onSubmit={handleSubmit} />
        </div>
      )}
    </section>
  );
}
