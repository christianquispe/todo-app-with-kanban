import { Button, Container, Grid, Stack, Typography } from "@mui/material";
import { TaskUpdateForm } from "../TaskUpdateForm";
import { useState } from "react";
import { useTasks } from "../context/TaskProvider";
import { useTheme } from "../../TasksApp/TasksApp";
import TaskList from "../TasksList/TasksList";

import "./styles.css";

export default function TaskView() {
  const [taskToEditId, setTaskToEditId] = useState<string | null>(null);
  const { tasks, updTask, getTask } = useTasks();

  const taskToEdit = getTask(taskToEditId ?? "");

  const { toggleColorMode } = useTheme();

  return (
    <Container>
      <Button onClick={() => toggleColorMode()}>
        <span>Cambiar de tema</span>
      </Button>
      <div className="container-tasks-app">
        <Typography variant="h2">Welcome back, Johan</Typography>
        <Typography>
          You've got {tasks.length} tasks up in the next days.
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={taskToEdit ? 6 : 12}>
            <div className="task-list-wrapper">
              <TaskList
                onSelect={(id) => {
                  if (id !== taskToEditId) {
                    setTaskToEditId(id);
                  } else {
                    setTaskToEditId(!taskToEditId ? id : null);
                  }
                }}
              />
            </div>
          </Grid>
          {taskToEditId && (
            <Grid item xs={6}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h4">Edit your task</Typography>
                <Button onClick={() => setTaskToEditId(null)}>
                  <span className="close-btn">Close X</span>
                </Button>
              </Stack>
              {taskToEdit && taskToEditId && (
                <TaskUpdateForm
                  defaultValues={taskToEdit}
                  onSubmit={(values) => {
                    console.log(values, "vales");
                    updTask(taskToEditId, { ...values });
                  }}
                />
              )}
            </Grid>
          )}
        </Grid>
      </div>
    </Container>
  );
}
