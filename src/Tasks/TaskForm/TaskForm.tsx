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

  const sumbit = (values: TaskFormInputs) => {
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(sumbit)} className="TaskForm">
      <input type="text" {...register("name")} className="input" />
      <input type="text" {...register("prioriy")} className="input" />
      <input type="text" {...register("status")} className="input" />
      <button type="submit">Enviar</button>
    </form>
  );
}
