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
  priority,
  number,
  ...rest
}: TaskCardProps) {
  return (
    <article className="TaskCard" {...rest}>
      <h3 className="title">{name}</h3>
      <span>#{number}</span>
      <span>{priority}</span>
      <Tag>{adapterStatus(status)}</Tag>
    </article>
  );
}
