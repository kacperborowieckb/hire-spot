import { render, screen } from "@testing-library/react";
import Logo from "./Logo";

describe("Logo", () => {
  it("Should render correctly", () => {
    render(<Logo />);

    const logoImg = screen.getByRole("img") as HTMLImageElement;

    expect(logoImg).toBeInTheDocument();
    expect(logoImg.src).toContain("logo.svg");
    expect(logoImg.alt).toContain("HireSpot logo");
  });
});
