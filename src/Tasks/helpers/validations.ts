import { Task } from "../context/TaskProvider";

export function isTaskValidToCreate(task: Task) {
  return Boolean(task.name);
}
