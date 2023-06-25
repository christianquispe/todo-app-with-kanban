import { Task } from "../context/TaskProvider";
import { adapterStatus } from "../adapters/tasks";

import "./styles.css";

interface TaskCardProps extends Task {
  onClick?: () => void;
}

export default function TaskCard({
  status = "backlog",
  name,
  prioriy,
  ...rest
}: TaskCardProps) {
  return (
    <div className="TaskCard" {...rest}>
      <span className="TaskCard title">{name}</span>
      <span>{prioriy}</span>
      <span>{adapterStatus(status)}</span>
    </div>
  );
}
