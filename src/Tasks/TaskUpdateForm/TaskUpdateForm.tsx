import { useForm, Controller } from "react-hook-form";

import { Task } from "../context/TaskProvider";

import "./styles.css";
import { useEffect } from "react";
import {
  PRIORITY_OPTIONS,
  PriorityOption,
  STATUS_OPTIONS,
  StatusOption,
} from "../constants";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

export type TaskFormInputs = Task;

interface TaskFormProps {
  onSubmit: (values: TaskFormInputs) => void;
  defaultValues?: TaskFormInputs;
}

export default function TaskUpdateForm({
  onSubmit,
  defaultValues,
}: TaskFormProps) {
  const { handleSubmit, reset, control } = useForm<TaskFormInputs>({
    mode: "onChange",
    defaultValues: {
      name: "",
      number: 0,
      priority: PRIORITY_OPTIONS[0].value,
      status: STATUS_OPTIONS[0].value,
      ...defaultValues,
    },
  });

  const submit = (values: TaskFormInputs) => {
    onSubmit(values);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  return (
    <form
      name="update-task-form"
      onSubmit={handleSubmit(submit)}
      className="TaskUpdateForm"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField
            type="text"
            placeholder="Type you task name"
            label="Task's name"
            {...field}
          />
        )}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="priority">Task's priority</InputLabel>
        <Controller
          name="priority"
          control={control}
          render={({ field }) => (
            <Select
              // aria-label="priority"
              {...field}
              onChange={(e) =>
                field.onChange(e.target.value as PriorityOption["value"])
              }
              label="Task's priority"
              inputProps={{
                ["aria-label"]: "priority",
              }}
            >
              {PRIORITY_OPTIONS.map(({ value, label }) => (
                <MenuItem key={value} value={value}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Task's status</InputLabel>
        <Controller
          name="status"
          aria-label="status"
          control={control}
          render={({ field }) => {
            return (
              <Select
                {...field}
                onChange={(e) =>
                  field.onChange(e.target.value as StatusOption["value"])
                }
                label="Select a status"
                inputProps={{
                  ["aria-label"]: "status",
                }}
              >
                {STATUS_OPTIONS.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            );
          }}
        />
      </FormControl>
      <Button type="submit">Enviar</Button>
    </form>
  );
}
