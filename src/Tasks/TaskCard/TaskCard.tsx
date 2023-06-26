import { Task } from "../context/TaskProvider";
import { adapterStatus } from "../adapters/tasks";

import "./styles.css";
import { Tag } from "../Tag";

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
      <span className="title">{name}</span>
      <span>{prioriy}</span>
      <Tag>{adapterStatus(status)}</Tag>
    </div>
  );
}
