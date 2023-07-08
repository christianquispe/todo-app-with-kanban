import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";

const form = {
  onSubmitMock: () => 13,
};

const onSubmitMock = vi.spyOn(form, "onSubmitMock");

afterEach(() => {
  onSubmitMock.mockReset();
});

describe("TaskForm", () => {
  test("renders form inputs", () => {
    render(
      <TaskForm
        onSubmit={() => {
          // Do nothing
        }}
      />
    );

    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "priority" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "status" })).toBeInTheDocument();
  });

  test("calls onSubmit with form values when submitted", async () => {
    render(<TaskForm onSubmit={form.onSubmitMock} />);

    const nameInput = screen.getByRole("textbox", { name: "name" });
    const priorityInput = screen.getByRole("textbox", { name: "priority" });
    const statusInput = screen.getByRole("textbox", { name: "status" });
    const submitButton = screen.getByRole("button", { name: "Enviar" });

    await userEvent.type(nameInput, "Task 1");
    await userEvent.type(priorityInput, "High");
    await userEvent.type(statusInput, "In Progress");
    await userEvent.click(submitButton);

    expect(onSubmitMock).toHaveBeenCalled();
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
    expect(onSubmitMock).toHaveBeenCalledWith({
      name: "Task 1",
      priority: "High",
      status: "In Progress",
    });
  });
});
