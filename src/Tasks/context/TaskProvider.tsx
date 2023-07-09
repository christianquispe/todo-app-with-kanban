import { PropsWithChildren, useEffect, useState } from "react";
import createSafeContext from "../../hooks/createSafeContext";
import { TASKS_KEY_LOCAL_STORAGE } from "../config";
import { isTaskValidToCreate } from "../helpers/validations";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type TaskStatusType = "backlog" | "to do" | "in progress" | "done";

export interface Task {
  name: string;
  priority?: "hight" | "medium" | "low";
  status?: TaskStatusType;
}

export interface TaskWithId extends Task {
  id: string;
}

export type getTasks = () => TaskWithId[];
export type AddTask = (task: Task) => void;
export type UpdTask = (id: string, updatedTask: Task) => void;
export type GetTask = (id: string) => TaskWithId | null;

export interface TaskProviderResolvers {
  tasks: TaskWithId[];
  addTask: AddTask;
  getTasks: () => TaskWithId[];
  getTask: GetTask;
  updTask: UpdTask;
}

const [useTasks, CreatorTaskProvider] =
  createSafeContext<TaskProviderResolvers>();

// eslint-disable-next-line react-refresh/only-export-components
export { useTasks, CreatorTaskProvider };
export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<TaskWithId[]>([]);

  const addTask: AddTask = (task) => {
    if (!isTaskValidToCreate(task)) return;

    const id = new Date().valueOf().toString();
    const newTask = {
      id,
      ...task,
    };
    const updTasks = [...tasks, newTask];
    localStorage.setItem(TASKS_KEY_LOCAL_STORAGE, JSON.stringify(updTasks));
    setTasks(updTasks);
  };

  const getTasks = () => {
    return tasks;
  };

  const updTask: UpdTask = (id, updatedTask) => {
    const updatedTaks = tasks.map((task) =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    localStorage.setItem(TASKS_KEY_LOCAL_STORAGE, JSON.stringify(updatedTaks));
    setTasks(updatedTaks);
  };

  const getTask = (id: string) => {
    const foundedTask = tasks.find((task) => task.id === id);
    if (!foundedTask) return null;
    return foundedTask;
  };

  useEffect(() => {
    const tasksCached = localStorage.getItem(TASKS_KEY_LOCAL_STORAGE);
    if (tasksCached) {
      setTasks(JSON.parse(tasksCached));
    }
  }, []);

  return (
    <CreatorTaskProvider
      value={{
        tasks,
        addTask,
        getTasks,
        updTask,
        getTask,
      }}
    >
      {children}
    </CreatorTaskProvider>
  );
}
