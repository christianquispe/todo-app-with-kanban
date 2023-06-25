const initialData: KanbanState = {
  columns: [
    {
      id: "backlog",
      title: "Backlog",
      tasks: [
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
    },
    {
      id: "to-do",
      title: "To Do",
      tasks: [
        {
          id: "task-5",
          content: "Hard work",
        },
      ],
    },
    {
      id: "in-progress",
      title: "in progress",
      tasks: [
        {
          id: "task-6",
          content: "Sleep like a baby",
        },
      ],
    },
    {
      id: "done",
      title: "Done",
      tasks: [],
    },
  ],
  // columnsBySlug: ["backlog", "to-do", "in-progress", "done"],
};

export default initialData;

type ColumnSlugs = "backlog" | "to-do" | "in-progress" | "done";

export interface KanbanState {
  columns: Columns;
}

export type Tasks = ITask[];

export interface ITask {
  id: string;
  content: string;
}

export type Columns = IColumn[];

export interface IColumn {
  id: ColumnSlugs;
  title: string;
  tasks: Tasks;
}
