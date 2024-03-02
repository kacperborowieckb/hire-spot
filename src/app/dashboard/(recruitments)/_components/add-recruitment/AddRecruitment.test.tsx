import { render, screen } from "@testing-library/react";
import AddRecruitment from "./AddRecruitment";

describe("AddRecruitment", () => {
  it("Should render card with correct link", () => {
    render(<AddRecruitment />);

    const card: HTMLLinkElement = screen.getByRole("link");

    expect(card.href).toContain("/dashboard/new");
    expect(card).toBeInTheDocument();
  });

  it("Should render description", () => {
    render(<AddRecruitment />);

    const paragraph = screen.getByText(/recruitment/i);

    expect(paragraph).toBeInTheDocument();
  });
});
