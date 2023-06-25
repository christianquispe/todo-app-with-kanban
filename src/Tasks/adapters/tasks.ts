import type { TaskStatusType } from "../context/TaskProvider";

export function adapterStatus(status: TaskStatusType) {
  const statusObj: { [key in TaskStatusType]: string } = {
    backlog: "Sin estado",
    "to do": "Por hacer",
    "in progress": "En progreso",
    done: "Hecho",
  };
  return statusObj[status];
}
