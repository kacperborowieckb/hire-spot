import { render, screen } from "@testing-library/react";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

const mockOnClick = jest.fn();

describe("Button", () => {
  it("Should render correctly", () => {
    render(<Button variant="default">Hello</Button>);

    const button = screen.getByRole("button", { name: "Hello" });

    expect(button).toBeInTheDocument();
  });

  it("Should call onClick", async () => {
    render(
      <Button variant="default" onClick={mockOnClick}>
        Hello
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Hello" });
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
