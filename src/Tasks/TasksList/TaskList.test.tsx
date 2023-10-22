import { createMockTasksProvider } from "../../test/createMockTaskProvider";
import { renderWithUser, screen, render } from "../../test/utils";
import { TaskWithId } from "../context/TaskProvider";

import TasksList from "./TasksList";

const TasksMocked: TaskWithId[] = [
  {
    id: "1",
    number: 1,
    name: "First task",
  },
  {
    id: "2",
    number: 2,
    name: "Second task",
  },
];

describe("<TaskCard />", () => {
  it("Should render with component's props", async () => {
    const taskProvider = createMockTasksProvider({
      tasks: TasksMocked,
    });
    const onSelectMock = vi.fn();
    render(<TasksList onSelect={onSelectMock} />, {
      wrapper: taskProvider,
    });
    screen.getByRole("list");
    const taskCards = screen.getAllByRole("listitem");
    expect(taskCards).toHaveLength(2);
  });
  it("Should exec on select event", async () => {
    const onSelectMock = vi.fn();
    const taskProvider = createMockTasksProvider({
      tasks: TasksMocked,
    });
    const { user } = renderWithUser(<TasksList onSelect={onSelectMock} />, {
      wrapper: taskProvider,
    });
    const taskCard = screen.getByRole("listitem", {
      name: `todo-item-${TasksMocked[0].id}`,
    });
    // await user.click(taskCard);
    // expect(onSelectMock).toBeCalledTimes(1);
    // expect(onSelectMock).toBeCalledWith(TasksMocked[0].id);
  });
});
