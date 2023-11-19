import { render, screen } from "@testing-library/react";
import Heading from "./Heading";

describe("Heading", () => {
  it("Should render logo", () => {
    render(<Heading />);

    const image = screen.getByRole("img");

    expect(image).toBeInTheDocument();
  });

  it("Should render heading", () => {
    render(<Heading />);

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });
  it("Should render description", () => {
    render(<Heading />);

    const desc = screen.getByText(/any questions/i);

    expect(desc).toBeInTheDocument();
  });
});
