import { render, screen } from "@testing-library/react";
import Hero from "./Hero";
import Home from "../../page";
import "intersection-observer";

describe("Hero", () => {
  it("Should render", () => {
    render(<Hero />);

    const heroSection = screen.getByTestId("hero");

    expect(heroSection).toBeInTheDocument();
  });

  it("Should render correct image", () => {
    render(<Hero />);

    const img: HTMLImageElement = screen.getByTestId("hero-img");

    expect(img).toBeInTheDocument();
    expect(img.src).toContain("hero.svg");
    expect(img.alt).toContain("Hero image");
  });

  it("Should render heading", () => {
    render(<Hero />);

    const heading = screen.getByRole("heading", {
      name: /Revolutionize Your/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("Should render desciption", () => {
    render(<Home />);

    const desciption = screen.getByText(/Discover a Smarter Way/i);

    expect(desciption).toBeInTheDocument();
  });
});
