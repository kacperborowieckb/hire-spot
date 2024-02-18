import { render, screen } from "@testing-library/react";
import InfoCard from "./InfoCard";
import { Ri24HoursFill } from "react-icons/ri";

const mockInfoCard = (
  <InfoCard
    icon={<Ri24HoursFill data-testid="info-card-icon" />}
    percentage={20}
    title="mockTitle"
    value={80}
  />
);

describe("InfoCard", () => {
  it("Should render icon", () => {
    render(mockInfoCard);

    const icon = screen.getByTestId("info-card-icon");

    expect(icon).toBeInTheDocument();
  });
  it("Should render percentage", () => {
    render(mockInfoCard);

    const percentage = screen.getByText(/20%/i);

    expect(percentage).toBeInTheDocument();
  });
  it("Should render value", () => {
    render(mockInfoCard);

    const value = screen.getByText(/80/);

    expect(value).toBeInTheDocument();
  });
  it("Should render title", () => {
    render(mockInfoCard);

    const title = screen.getByText(/mockTitle/i);

    expect(title).toBeInTheDocument();
  });
});
