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
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          name={task.name}
          priority={task.priority}
          status={task.status}
          onClick={() => onSelect(task.id)}
        />
      ))}
    </section>
  );
}
