// import { TaskForm } from "../TaskForm";
import TaskList from "../TasksList/TasksList";
import { useTasks } from "../context/TaskProvider";
import "./styles.css";

export default function TaskView() {
  const { tasks } = useTasks();
  return (
    <section className="TasksView">
      <h2>Welcome back, Johan</h2>
      <p>You've got {tasks.length} tasks up in the nexts days.</p>
      <TaskList
        onSelect={() => {
          console.log("Seleccionado");
        }}
      />
      {/* <div className="task-form-container">
          <TaskForm onSubmit={(values) => { console.log(values)}} />
        </div> */}
    </section>
  );
}
