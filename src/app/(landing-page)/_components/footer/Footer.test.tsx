import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

it("Should render", () => {
  render(<Footer />);

  const footer = screen.getByRole("contentinfo");

  expect(footer).toBeInTheDocument();
});
