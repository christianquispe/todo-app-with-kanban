import { TaskView } from "../Tasks/TaskView";
import { TasksProvider } from "../Tasks/context/TaskProvider";
import "./styles.css";

export default function TasksApp() {
  return (
    <TasksProvider>
      <TaskView />
    </TasksProvider>
  );
}
