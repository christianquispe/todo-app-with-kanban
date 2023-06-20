import initialData from "../../data/initial-data";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./styles.css";

type ValueOf<T> = T[keyof T];

interface ColumnProps {
  column: ValueOf<(typeof initialData)["columns"]>;
  tasks: ValueOf<(typeof initialData)["tasks"]>[];
}

export default function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="Column">
      <div className="Title">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provider) => {
          // console.log(snapshot, "snapshot");
          return (
            <div
              className="TaskList"
              ref={provider.innerRef}
              {...provider.droppableProps}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provider.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
}
