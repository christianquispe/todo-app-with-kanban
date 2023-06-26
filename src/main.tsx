import React from "react";
import ReactDOM from "react-dom/client";
import AppTasks from "./TasksApp/TasksApp.tsx";

import "./index.css";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AppTasks />
    {/* <App /> */}
  </React.StrictMode>
);
