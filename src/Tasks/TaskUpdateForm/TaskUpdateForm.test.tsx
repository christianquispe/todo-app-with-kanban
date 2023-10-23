import { TaskUpdateForm } from ".";
import {
  fireEvent,
  render,
  renderWithUser,
  screen,
  userEvent,
} from "../../test/utils";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../constants";

const mockSubmit = vi.fn();

afterEach(() => {
  mockSubmit.mockReset();
});

describe("<TaskUpdateForm />", async () => {
  it("Should render form with its inputs", async () => {
    render(<TaskUpdateForm onSubmit={mockSubmit} />);

    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: /task's name/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /priority/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /status/i })
    ).toBeInTheDocument();
  });

  it("Should don't trigger the form", async () => {
    render(<TaskUpdateForm onSubmit={mockSubmit} />);

    fireEvent.submit(screen.getByRole("button"));

    expect(mockSubmit).not.toBeCalled();
  });

  it("Should save inputs value in form's state", async () => {
    const { user } = renderWithUser(<TaskUpdateForm onSubmit={mockSubmit} />);

    const form = screen.getByRole("form");

    expect(form).toHaveFormValues({});

    const nameInput = screen.getByRole("textbox", { name: /task's name/i });
    const priorityInput = screen.getByRole("combobox", { name: /priority/i });
    const statusInput = screen.getByRole("combobox", { name: /status/i });

    // Type a name
    await user.type(nameInput, "uno");

    // Select priority
    let options;
    await user.click(priorityInput);
    options = await screen.findAllByRole("option");
    expect(options).toHaveLength(3);
    const lowOption = options[0];
    await user.click(lowOption);
    options = screen.queryAllByRole("option");
    expect(options).toHaveLength(0);

    // Select a status
    let statusOptions;
    await user.click(statusInput);
    statusOptions = await screen.findAllByRole("option");
    expect(statusOptions).toHaveLength(4);
    const todoOption = statusOptions[0];
    await user.click(todoOption);
    statusOptions = screen.queryAllByRole("option");
    expect(statusOptions).toHaveLength(0);

    // await user.click(form);

    expect(form).toHaveFormValues({
      name: "uno",
      priority: PRIORITY_OPTIONS[0].value,
      status: STATUS_OPTIONS[0].value,
    });
  });

  it("Should exec osSubmit prop", async () => {
    const user = userEvent.setup();
    render(<TaskUpdateForm onSubmit={mockSubmit} />);
    const submitBtn = screen.getByRole("button", { name: /enviar/i });

    const nameInput = screen.getByRole("textbox", { name: /task's name/i });
    const priorityInput = screen.getByRole("combobox", { name: /priority/i });
    const statusInput = screen.getByRole("combobox", { name: /status/i });

    await user.type(nameInput, "uno");
    await user.click(priorityInput);
    const priorityOptions = await screen.findAllByRole("option");
    await user.click(priorityOptions[0]);
    await user.click(statusInput);
    const statusOptions = await screen.findAllByRole("option");
    await user.click(statusOptions[0]);

    await user.click(submitBtn);
    expect(mockSubmit).toBeCalledTimes(1);
    expect(mockSubmit).toBeCalledWith({
      number: 0, // Revisar por qué
      name: "uno",
      priority: PRIORITY_OPTIONS[0].value,
      status: STATUS_OPTIONS[0].value,
    });
  });
});
