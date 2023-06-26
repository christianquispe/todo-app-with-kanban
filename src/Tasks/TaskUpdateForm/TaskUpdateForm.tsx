import { useForm } from "react-hook-form";

import { Task } from "../context/TaskProvider";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";

import "./styles.css";
import { useEffect } from "react";

export type TaskFormInputs = Task;

interface TaskFormProps {
  onSubmit: (values: TaskFormInputs) => void;
  defaultValues?: TaskFormInputs;
}

export default function TaskUpdateForm({
  onSubmit,
  defaultValues,
}: TaskFormProps) {
  const { register, handleSubmit, reset } = useForm<TaskFormInputs>({
    mode: "onChange",
    defaultValues,
  });

  const submit = (values: TaskFormInputs) => {
    onSubmit(values);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form onSubmit={handleSubmit(submit)} className="TaskUpdateForm">
      <Input
        type="text"
        variant="clean"
        {...register("name")}
        placeholder="Type you task name"
      />
      <Input type="text" placeholder="Prioridad" {...register("prioriy")} />
      <Input type="text" placeholder="Estado" {...register("status")} />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
