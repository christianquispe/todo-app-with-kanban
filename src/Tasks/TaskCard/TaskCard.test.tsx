import { render, screen } from "../../test/utils";

import TaskCard from "./TaskCard";

describe("<TaskCard />", () => {
  it("Should render with component's props", () => {
    render(<TaskCard name="First task" number={1} />);
    expect(screen.getByRole("heading")).toHaveTextContent("First task");
    screen.getByText("Sin estado");
    screen.getByText("#1");
  });
  it("Should changes status label when its status props changes", () => {
    const { rerender } = render(
      <TaskCard name="First task" status="in progress" number={2} />
    );
    screen.getByText("En progreso");
    screen.getByText("#2");
    rerender(<TaskCard name="First task" status="done" number={2} />);
    screen.getByText("Hecho");
  });
});
