import React from "react";
import ReactDOM from "react-dom/client";
import AppTasks from "./TasksApp/TasksApp.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTasks />
  </React.StrictMode>
);
