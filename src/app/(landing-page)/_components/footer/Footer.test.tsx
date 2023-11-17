import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

jest.mock("@clerk/nextjs", () => ({
  useUser: jest.fn().mockReturnValue({ isSignedIn: false }),
}));

it("Should render", () => {
  render(<Footer />);

  const footer = screen.getByRole("contentinfo");

  expect(footer).toBeInTheDocument();
});
