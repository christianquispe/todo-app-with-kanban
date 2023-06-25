import type { IColumn, Tasks } from "../../data/modify-data";
import { Droppable } from "react-beautiful-dnd";
import Task from "../Task/Task";
import "./styles.css";

interface ColumnProps {
  column: IColumn;
  tasks: Tasks;
}

export default function Column({ column, tasks }: ColumnProps) {
  return (
    <div className="Column">
      <div className="Title">{column.title}</div>
      <Droppable droppableId={column.id}>
        {(provider) => {
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
