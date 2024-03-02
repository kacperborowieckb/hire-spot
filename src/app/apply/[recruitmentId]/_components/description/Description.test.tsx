import { screen, render } from "@testing-library/react";
import Description from "./Description";
import userEvent from "@testing-library/user-event";

describe("Dashboard", () => {
  it("Should not render desc at initial load", () => {
    render(<Description desc="mockDesc" />);

    const desc = screen.queryByText(/mockDesc/i);

    expect(desc).not.toBeInTheDocument();
  });
  it("Should render desc on user click", async () => {
    render(<Description desc="mockDesc" />);

    const expand = screen.getByTestId("expand-desc");
    await userEvent.click(expand);
    const desc = screen.queryByText(/mockDesc/i);

    expect(desc).toBeInTheDocument();
  });
});
