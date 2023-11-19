import { render, screen } from "@testing-library/react";
import Contact from "~/app/(landing-page)/contact/page";

describe("Contact", () => {
  it("Should render contact cards", () => {
    render(<Contact />);

    const cards = screen.getAllByTestId("contact-card");

    expect(cards.length).toEqual(2);
  });

  it("Should render heading", () => {
    render(<Contact />);

    const heading = screen.getByTestId("contact-heading");

    expect(heading).toBeInTheDocument();
  });
});
