import { render, screen } from "@testing-library/react";
import Benefit from "./Benefit";
import "intersection-observer";

const mockBenefit = {
  title: "Effortless Recruitment",
  content:
    "Simplify your hiring process with our intuitive platform. Post jobs, review applications, and select top candidates effortlessly.",
  src: "/hiring-benefit.svg",
  alt: "Candidates resumes",
};

const BenefitWithProps = (
  <Benefit
    title={mockBenefit.title}
    content={mockBenefit.content}
    src={mockBenefit.src}
    alt={mockBenefit.alt}
  />
);

describe("Benefit", () => {
  it("To render", () => {
    render(BenefitWithProps);

    const benefit = screen.getByTestId("benefit");

    expect(benefit).toBeInTheDocument();
  });

  it("To render correct content", () => {
    render(BenefitWithProps);

    const title = screen.getByText(mockBenefit.title);
    const content = screen.getByText(mockBenefit.content);
    const img = screen.getByRole("img");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  it("Image contain correct properties", () => {
    render(BenefitWithProps);

    const img: HTMLImageElement = screen.getByRole("img");

    expect(img.src).toContain(mockBenefit.src);
    expect(img.alt).toEqual(mockBenefit.alt);
  });
});
