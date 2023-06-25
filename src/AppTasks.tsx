import { TaskView } from "./Tasks/TaskView";
import { TasksProvider } from "./Tasks/context/TaskProvider";

export default function AppTasks() {
  return (
    <TasksProvider>
      <section className="AppTasks">
        <TaskView />
      </section>
    </TasksProvider>
  );
}
