import { TaskUpdateForm } from ".";
import { fireEvent, render, screen, userEvent } from "../../test/utils";
import selectEvent from "react-select-event";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../contants";

const mockSubmit = vi.fn();

afterEach(() => {
  mockSubmit.mockReset();
});

describe("<TaskUpdateForm />", async () => {
  it("Should render form with its inputs", async () => {
    render(<TaskUpdateForm onSubmit={mockSubmit} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "name" })).toBeInTheDocument();
    expect(screen.getByLabelText("Task's priority")).toBeInTheDocument();
    expect(screen.getByLabelText("Task's status")).toBeInTheDocument();
  });

  it("Should don't trigger the form", async () => {
    render(<TaskUpdateForm onSubmit={mockSubmit} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(mockSubmit).not.toBeCalled();
  });

  it("Should save inputs value in form's state", async () => {
    const user = userEvent.setup();
    render(<TaskUpdateForm onSubmit={mockSubmit} />);

    const form = screen.getByRole("form");

    expect(form).toHaveFormValues({});

    const nameInput = screen.getByRole("textbox", {
      name: "name",
    });
    const priorityInput = screen.getByLabelText("Task's priority");
    const statusInput = screen.getByLabelText("Task's status");

    await user.type(nameInput, "uno");
    await selectEvent.select(priorityInput, PRIORITY_OPTIONS[0].label);
    await selectEvent.select(statusInput, STATUS_OPTIONS[0].label);

    expect(form).toHaveFormValues({
      name: "uno",
      priority: PRIORITY_OPTIONS[0].value,
      status: STATUS_OPTIONS[0].value,
    });
  });

  it("Should exec osSubmit prop", async () => {
    const user = userEvent.setup();
    render(<TaskUpdateForm onSubmit={mockSubmit} />);
    const submitBtn = screen.getByRole("button", { name: /Enviar/i });

    const nameInput = screen.getByRole("textbox", {
      name: "name",
    });
    const priorityInput = screen.getByLabelText("Task's priority");
    const statusInput = screen.getByLabelText("Task's status");

    await user.type(nameInput, "uno");
    await selectEvent.select(priorityInput, PRIORITY_OPTIONS[0].label);
    await selectEvent.select(statusInput, STATUS_OPTIONS[0].label);

    await user.click(submitBtn);
    expect(mockSubmit).toBeCalledTimes(1);
    expect(mockSubmit).toBeCalledWith({
      name: "uno",
      priority: PRIORITY_OPTIONS[0].value,
      status: STATUS_OPTIONS[0].value,
    });
  });
});
