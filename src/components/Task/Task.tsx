import initialData from "../../data/initial-data";
import { Draggable } from "react-beautiful-dnd";
import "./styles.css";

type ValueOf<T> = T[keyof T];

interface ColumnProps {
  task: ValueOf<(typeof initialData)["tasks"]>;
  index: number;
}

export default function Task({ task, index }: ColumnProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provider) => (
        <div
          className="Task"
          {...provider.dragHandleProps}
          {...provider.draggableProps}
          ref={provider.innerRef}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}
