import { render, screen } from "@testing-library/react";
import Nav from "./Nav";
import "intersection-observer";
import userEvent from "@testing-library/user-event";
import { useUser, UserButton } from "@clerk/nextjs";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn().mockReturnValue({ isSignedIn: false, isLoaded: true }),
  UserButton: () => {
    return <button data-testid="user-button" />;
  },
}));

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

    it("Should not display user button when not logged in", () => {
      render(<Nav />);

      const userButton = screen.queryByTestId("user-button");

      expect(userButton).not.toBeInTheDocument();
    });

    it("Should display user button when logged in", async () => {
      (useUser as jest.Mock).mockImplementation(() => ({
        isSignedIn: true,
        isLoaded: true,
      }));
      render(<Nav />);

      const userButton = screen.queryByTestId("user-button");
      const signInButton = screen.queryByRole("button", { name: "Sign in" });

      expect(userButton).toBeInTheDocument();
      expect(signInButton).not.toBeInTheDocument();
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
