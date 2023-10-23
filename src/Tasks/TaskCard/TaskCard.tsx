import { Task } from "../context/TaskProvider";
import { adapterStatus } from "../adapters/tasks";
import { Card, CardContent, Chip, Stack, Typography } from "@mui/material";

import "./styles.css";

const conditionalRender = (condition: boolean, children: JSX.Element) =>
  condition ? children : null;

interface TaskCardProps extends Task {
  onClick?: () => void;
}

export default function TaskCard({
  status = "backlog",
  name,
  priority,
  number,
  ...rest
}: TaskCardProps) {
  return (
    <Card
      {...rest}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          rest.onClick?.();
        }
      }}
    >
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Stack
          display="flex"
          direction="row"
          justifyContent="flex-end"
          spacing={2}
        >
          {conditionalRender(
            Boolean(number),
            <Chip
              label={`#${number}`}
              variant="filled"
              color="primary"
              size="small"
            />
          )}
          {conditionalRender(
            Boolean(priority),
            <Chip
              label={priority}
              variant="filled"
              color="primary"
              size="small"
            />
          )}
          {conditionalRender(
            Boolean(status),
            <Chip
              label={adapterStatus(status)}
              variant="filled"
              color="primary"
              size="small"
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
