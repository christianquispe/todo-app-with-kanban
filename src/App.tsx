import { useEffect, useState } from "react";
import "./App.css";
import initialData from "./data/initial-data";
import { DragDropContext, type OnDragEndResponder } from "react-beautiful-dnd";
import { Column } from "./components/Column";

function App() {
  const [data, setData] = useState<typeof initialData>();

  useEffect(() => {
    setData(initialData);
  }, []);

  const handleDragEnd: OnDragEndResponder = (result, provider) => {
    console.log({ result, provider }, "DRAG END");
    const { destination, source, draggableId } = result;
    if (!destination) {
      console.log("No tiene destino");
      return;
    }
    if (
      source.index === destination?.index &&
      source.droppableId === destination?.droppableId
    ) {
      console.log("No está cambiando de orden ni de columna");
      return;
    }

    const startColumn =
      data?.columns[source.droppableId as keyof typeof data.columns];
    const finishColumn =
      data?.columns[destination.droppableId as keyof typeof data.columns];

    if (startColumn?.id === finishColumn?.id) {
      const column =
        data?.columns[source.droppableId as keyof typeof data.columns];
      const newTasksIds = [...(column?.taskIds ?? [])];
      newTasksIds.splice(source.index, 1);
      newTasksIds.splice(destination.index, 0, draggableId);

      const newColumn: any = {
        ...column,
        taskIds: newTasksIds,
      };

      if (!newColumn) return;

      setData({
        ...data,
        columns: {
          ...data?.columns,
          [newColumn.id as any]: newColumn,
        },
      } as any);
      return;
    }

    // Removing task form start column
    const updStartColumnTasksIds = [...(startColumn?.taskIds ?? [])];
    updStartColumnTasksIds.splice(source.index, 1);

    const updStartColumn: any = {
      ...startColumn,
      taskIds: updStartColumnTasksIds,
    };

    const updFinishColumnTasksIds = [...(finishColumn?.taskIds ?? [])];
    updFinishColumnTasksIds.splice(destination.index, 0, draggableId);

    const updFinishColumn: any = {
      ...finishColumn,
      taskIds: updFinishColumnTasksIds,
    };

    setData({
      ...data,
      columns: {
        ...data?.columns,
        [updStartColumn.id as any]: updStartColumn,
        [updFinishColumn.id as any]: updFinishColumn,
      },
    } as any);
  };

  console.log(data, "DATA");

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {data?.columnOrderByIds.map((id) => {
        const column = data.columns[id as keyof typeof data.columns];
        const tasks = column.taskIds.map(
          (taskId) => data.tasks[taskId as keyof typeof data.tasks]
        );
        return <Column key={id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
}

export default App;
