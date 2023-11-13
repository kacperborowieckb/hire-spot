import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import "intersection-observer";
import userEvent from "@testing-library/user-event";

// add test for sign in / sign out when done

describe("Nav", () => {
  describe("Render", () => {
    it("Should render", () => {
      render(<Nav />);

      const nav = screen.getByRole("navigation");

      expect(nav).toBeInTheDocument();
    });

    it("Should not render a mobile nav", () => {
      render(<Nav />);

      const mobileNav = screen.queryByTestId("mobile-nav");

      expect(mobileNav).not.toBeInTheDocument();
    });

    it("Should render nav links container", () => {
      render(<Nav />);

      const navLinks = screen.getByTestId("nav-links-container");

      expect(navLinks).toBeInTheDocument();
    });

    it("Should render a sign in button", () => {
      render(<Nav />);

      const signInButton = screen.getByRole("button", { name: "Sign in" });

      expect(signInButton).toBeInTheDocument();
    });

    it("Should render a open nav button", () => {
      render(<Nav />);

      const openNavButton = screen.getByTestId("open-nav-button");

      expect(openNavButton).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("Should open the nav on button click", async () => {
      render(<Nav />);

      const openNavButton = screen.getByTestId("open-nav-button");

      await userEvent.click(openNavButton);

      const mobileNav = screen.getByTestId("mobile-nav");

      expect(mobileNav).toBeInTheDocument();
    });

    it("Should render mobile nav links after open nav button click", async () => {
      render(<Nav />);

      const openNavButton = screen.getByTestId("open-nav-button");

      await userEvent.click(openNavButton);

      const navLinks = screen.getAllByTestId("nav-links-container");

      expect(navLinks).toHaveLength(2);
    });

    it("Should render a close nav button when nav is open", async () => {
      render(<Nav />);

      const closeNavButton = screen.queryByTestId("close-nav-button");

      expect(closeNavButton).not.toBeInTheDocument();

      await userEvent.click(screen.getByTestId("open-nav-button"));

      const closeNavButtonAfterClick = screen.queryByTestId("close-nav-button");

      expect(closeNavButtonAfterClick).toBeInTheDocument();
    });
  });
});
