import { render, screen } from "@testing-library/react";
import Home from "~/app/(landing-page)/page";
import "intersection-observer";

describe("Home", () => {
  it("Should render", () => {
    render(<Home />);

    const home = screen.getByRole("main");
    const heading = screen.getByText(/explore our/i);
    const underlinedText = screen.getByText(/features/i);

    expect(home).toBeInTheDocument();
    expect(heading).toBeInTheDocument();
    expect(underlinedText).toBeInTheDocument();
  });

  it("Should render Hero section", () => {
    const { getByTestId } = render(<Home />);

    const heroSection = getByTestId("hero");

    expect(heroSection).toBeInTheDocument();
  });

  it("Should render 3 benefit sections", () => {
    const { getAllByTestId } = render(<Home />);

    const benefitSections = getAllByTestId("benefit");

    expect(benefitSections).toHaveLength(3);
  });
});
