import { Select } from "../../shared/components/Select";
import { useForm, Controller } from "react-hook-form";

import { Task } from "../context/TaskProvider";
import { Input } from "../../shared/components/Input";
import { Button } from "../../shared/components/Button";

import "./styles.css";
import { useEffect } from "react";
import { SelectOption } from "../../shared/components/Select/Select";

export type TaskFormInputs = Task;

interface TaskFormProps {
  onSubmit: (values: TaskFormInputs) => void;
  defaultValues?: TaskFormInputs;
}

interface PriorityOption {
  label: string;
  value: Task["prioriy"];
}

interface StatusOption {
  label: string;
  value: Task["status"];
}

const PRIORITY_OPTIONS: PriorityOption[] = [
  { label: "Alta", value: "hight" },
  { label: "Medio", value: "medium" },
  { label: "Bajo", value: "low" },
];

const STATUS_OPTIONS: StatusOption[] = [
  { label: "Backlog", value: "backlog" },
  { label: "Por hacer", value: "to do" },
  { label: "En progreso", value: "in progress" },
  { label: "Hecho", value: "done" },
];

export default function TaskUpdateForm({
  onSubmit,
  defaultValues,
}: TaskFormProps) {
  const { register, handleSubmit, reset, control } = useForm<TaskFormInputs>({
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
      <Controller
        name="prioriy"
        control={control}
        render={({ field: { onBlur, onChange, value, ref } }) => (
          <Select
            ref={ref}
            onBlur={onBlur}
            options={PRIORITY_OPTIONS.map(({ value, label }) => ({
              label,
              value: value as string,
            }))}
            onChange={(val) => onChange(val.value as PriorityOption["value"])}
            value={
              PRIORITY_OPTIONS.find(
                (opt) => opt.value === value
              ) as SelectOption
            }
          />
        )}
      />
      <Controller
        name="status"
        control={control}
        render={({ field: { onBlur, onChange, value, ref } }) => (
          <Select
            ref={ref}
            onBlur={onBlur}
            options={STATUS_OPTIONS.map(({ value, label }) => ({
              label,
              value: value as string,
            }))}
            onChange={(val) => onChange(val.value as StatusOption["value"])}
            value={
              STATUS_OPTIONS.find((opt) => opt.value === value) as SelectOption
            }
          />
        )}
      />
      <Button type="submit">Enviar</Button>
    </form>
  );
}
