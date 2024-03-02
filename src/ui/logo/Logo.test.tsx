import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("Should render correctly", () => {
    render(<Logo />);

    const logoImg: HTMLImageElement = screen.getByRole("img");

    expect(logoImg).toBeInTheDocument();
    expect(logoImg.src).toContain("logo.svg");
    expect(logoImg.alt).toContain("HireSpot logo");
  });
});
