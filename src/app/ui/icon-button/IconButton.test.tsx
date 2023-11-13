import { render, screen } from "@testing-library/react";
import IconButton from "./IconButton";
import { RiAB } from "react-icons/ri";
import userEvent from "@testing-library/user-event";

const mockOnClick = jest.fn();

describe("IconButton", () => {
  it("Should render a button with correct icon", () => {
    render(<IconButton onClick={mockOnClick} Icon={RiAB} />);

    const icon = screen.getByTestId("icon-button-icon");

    expect(icon).toBeInTheDocument();
  });
  it("Should call onClick", async () => {
    render(<IconButton onClick={mockOnClick} Icon={RiAB} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(mockOnClick).toHaveBeenCalled();
  });
});
