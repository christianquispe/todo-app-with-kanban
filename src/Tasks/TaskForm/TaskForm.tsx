import { useForm } from "react-hook-form";

import "./styles.css";
import { Task } from "../context/TaskProvider";

export type TaskFormInputs = Task;

interface TaskFormProps {
  onSubmit: (values: TaskFormInputs) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const { register, handleSubmit } = useForm<TaskFormInputs>({
    mode: "onChange",
  });

  const submit = (values: TaskFormInputs) => {
    onSubmit(values);
  };

  return (
    <form
      aria-label="task-form"
      onSubmit={handleSubmit(submit)}
      className="TaskForm"
    >
      <input
        type="text"
        {...register("name")}
        aria-label="name"
        className="input"
      />
      <input
        type="text"
        {...register("priority")}
        aria-label="priority"
        className="input"
      />
      <input
        type="text"
        {...register("status")}
        aria-label="status"
        className="input"
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
