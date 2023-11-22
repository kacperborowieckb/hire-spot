import { render, screen } from "@testing-library/react";
import NavLinks from "./NavLinks";
import { userEvent } from "@testing-library/user-event";

const toggleNavMock = jest.fn();
jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn().mockReturnValue({ isSignedIn: false }),
}));

describe("NavLinks", () => {
  describe("Render", () => {
    it("Should render correct links", async () => {
      render(<NavLinks />);

      const homeLink = screen.getByText("Home");
      const pricingLink = screen.getByText("Pricing");
      const contactLink = screen.getByText("Contact");

      expect(homeLink).toBeInTheDocument();
      expect(pricingLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });
  });

  describe("Closing nav", () => {
    it("Should close nav after click", async () => {
      render(<NavLinks toggleNav={toggleNavMock} />);

      const homeLink = screen.getByText("Home");
      await userEvent.click(homeLink);

      expect(toggleNavMock).toHaveBeenCalled();
    });
  });
});
