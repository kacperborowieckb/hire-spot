import { render, screen } from "@testing-library/react";
import Pricing from "~/app/(landing-page)/pricing/page";

describe("Pricing", () => {
  it("Should render heading with img", () => {
    render(<Pricing />);

    const heading = screen.getByRole("heading", { name: /Free!/i });
    const img = screen.getByRole("img");

    expect(heading).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });
  it("Should render description", () => {
    render(<Pricing />);

    const desc = screen.getByText(/Enjoy the full functionality/i);

    expect(desc).toBeInTheDocument();
  });
  it("Should render link with button", () => {
    render(<Pricing />);

    const button = screen.getByRole("button");
    const link = screen.getByRole("link");

    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
});
