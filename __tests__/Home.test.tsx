import { render, screen } from "@testing-library/react";
import Home from "~/app/(landing-page)/page";
import "intersection-observer";

it("Should render home", () => {
  render(<Home />);

  const myElem = screen.getByRole("main");

  expect(myElem).toBeInTheDocument();
});
