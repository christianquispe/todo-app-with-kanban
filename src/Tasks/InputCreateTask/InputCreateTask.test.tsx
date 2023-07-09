import { InputCreateTask } from ".";
import { createMockTasksProvider } from "../../test/createMockTaskProvider";
import { screen, render, userEvent, renderHook, act } from "../../test/utils";
import * as TaskProviderObjt from "../context/TaskProvider";

const { TasksProvider, useTasks } = TaskProviderObjt;

describe("<InputCreateTask />", () => {
  it("Should render", () => {
    render(
      <TasksProvider>
        <InputCreateTask />
      </TasksProvider>
    );
    const nameInput = screen.getByRole("textbox");
    expect(nameInput).toBeInTheDocument();
  });

  it("Should exec provider methods", async () => {
    const addTaskMock = vi.fn();
    const user = userEvent.setup();
    const MockTaskProvider = createMockTasksProvider({ addTask: addTaskMock });
    render(
      <MockTaskProvider>
        <InputCreateTask />
      </MockTaskProvider>
    );
    const nameInput = screen.getByRole("textbox");
    await user.type(nameInput, "First task");
    expect(nameInput).toHaveValue("First task");
    await user.type(nameInput, "{enter}");
    const { result } = renderHook(() => useTasks(), { wrapper: TasksProvider });
    expect(addTaskMock).toBeCalledTimes(1);
    const newTaks = { name: "First task" };
    act(() => {
      result.current.addTask(newTaks);
    });
    expect(result.current.getTasks()).toHaveLength(1);
    expect(result.current.getTasks()).toContainEqual(
      expect.objectContaining(newTaks)
    );
  });
});
