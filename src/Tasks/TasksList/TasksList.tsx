import "./styles.css";

import { useTasks } from "../context/TaskProvider";
import { InputCreateTask } from "../InputCreateTask";
import { TaskCard } from "../TaskCard";

interface TaskList {
  onSelect: (id: string) => void;
}

export default function TaskList({ onSelect }: TaskList) {
  const { tasks } = useTasks();

  return (
    <section className="TasksList">
      <InputCreateTask />
      <ul>
        {tasks.map((task) => (
          <li key={task.id} aria-label={`todo-item-${task.id}`}>
            <TaskCard
              name={task.name}
              priority={task.priority}
              status={task.status}
              number={task.number}
              onClick={() => onSelect(task.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
