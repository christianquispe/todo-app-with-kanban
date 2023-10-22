import { NonUndefined } from "react-hook-form";
import { Task } from "./context/TaskProvider";

export interface PriorityOption {
  label: string;
  value: NonUndefined<Task["priority"]>;
}

export interface StatusOption {
  label: string;
  value: NonUndefined<Task["status"]>;
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { label: "Alta", value: "hight" },
  { label: "Medio", value: "medium" },
  { label: "Bajo", value: "low" },
];

export const STATUS_OPTIONS: StatusOption[] = [
  { label: "Backlog", value: "backlog" },
  { label: "Por hacer", value: "to do" },
  { label: "En progreso", value: "in progress" },
  { label: "Hecho", value: "done" },
];
