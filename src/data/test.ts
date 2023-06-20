const initialData = {
  tasks: {
    "column-1": [
      {
        id: "task-1",
        content: "Make my bed",
      },
      {
        id: "task-2",
        content: "Take a shower",
      },
      {
        id: "task-3",
        content: "Read a book",
      },
    ],
    "column-2": [
      {
        id: "task-4",
        content: "Hard work",
      },
    ],
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To Do",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
  },
  columnOrderByIds: ["column-1", "column-2"],
};

export default initialData;
