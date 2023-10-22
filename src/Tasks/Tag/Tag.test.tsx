import { render, screen } from "../../test/utils";

import Tag from "./Tag";

describe("<TaskCard />", () => {
  it("Should render with component's props", () => {
    const content = "Hola";
    render(<Tag>{content}</Tag>);
    screen.getByText(content);
  });
});
