import { useEffect, useState } from "react";
import "./App.css";
import initialData, { IColumn, KanbanState } from "./data/modify-data";
import { DragDropContext, type OnDragEndResponder } from "react-beautiful-dnd";
import { Column } from "./components/Column";
import { changeColumn } from "./utils/kanban-utils";

function App() {
  const [data, setData] = useState<KanbanState>();

  useEffect(() => {
    setData(initialData);
  }, []);

  const handleDragEnd: OnDragEndResponder = (result, provider) => {
    console.log({ result, provider }, "DRAG END");
    const { destination, source } = result;
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

    const startColumn = data?.columns.find(
      ({ id }) => source.droppableId === id
    );
    const finishColumn = data?.columns.find(
      ({ id }) => destination.droppableId === id
    );
    console.log({ startColumn, finishColumn });

    // Para que typescript no moleste xd
    if (!startColumn || !finishColumn) {
      return;
    }

    // Si está cambiando en la misma columna
    if (startColumn?.id === finishColumn?.id) {
      const tasks = [...startColumn.tasks];
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      const udpColumn: IColumn = {
        ...startColumn,
        tasks: [...tasks],
      };
      const udpColumns = data?.columns.map((column) => {
        if (source.droppableId === column.id) {
          return udpColumn;
        }
        return column;
      });
      const updData: KanbanState = {
        ...data,
        columns: udpColumns ?? [],
      };
      setData(updData);
      return;
    }

    // Se está moviendo a una columna diferente

    // Removing task form start column
    const startTasks = [...startColumn.tasks];
    const [movedTask] = startTasks.splice(source.index, 1);

    const updStartColumn: IColumn = {
      ...startColumn,
      tasks: startTasks,
    };

    const finishTasks = [...finishColumn.tasks];
    finishTasks.splice(destination.index, 0, movedTask);

    const updFinishColumn: IColumn = {
      ...finishColumn,
      tasks: finishTasks,
    };

    const udpColumns = changeColumn(
      [updStartColumn, updFinishColumn],
      data?.columns ?? []
    );

    const updData: KanbanState = {
      ...data,
      columns: udpColumns,
    };

    setData(updData);
  };

  console.log(data, "DATA");

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="ColumnsList">
        {data?.columns.map((column) => {
          const tasks = column.tasks;
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
    </DragDropContext>
  );
}

export default App;
