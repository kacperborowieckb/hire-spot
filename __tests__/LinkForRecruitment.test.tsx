import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LinkForRecruitmentPage from "~/app/dashboard/(recruitments)/new/[id]/page";

describe("Dashboard", () => {
  it("Should render heading", async () => {
    render(await LinkForRecruitmentPage({ params: { id: "testId" } }));

    const heading = screen.getByRole("heading");

    expect(heading).toBeInTheDocument();
  });

  it("Should have further instructions", async () => {
    render(await LinkForRecruitmentPage({ params: { id: "testId" } }));

    const instructionsFirst = screen.getByText(/created a recruitment/i);
    const instructionsSecond = screen.getByText(/send this link/i);

    expect(instructionsFirst).toBeInTheDocument();
    expect(instructionsSecond).toBeInTheDocument();
  });

  it("Should render a link for candidates", async () => {
    render(await LinkForRecruitmentPage({ params: { id: "testId" } }));

    const link = screen.getByText(/testid/i);

    expect(link).toBeInTheDocument();
  });

  it("Should render link to dashboard", async () => {
    render(await LinkForRecruitmentPage({ params: { id: "testId" } }));

    const link = screen.getByRole("link") as HTMLAnchorElement;

    expect(link.href).toContain("testId");
  });

  it("Should render a button", async () => {
    render(await LinkForRecruitmentPage({ params: { id: "testId" } }));

    const button = screen.getByRole("button");

    expect(button).toBeInTheDocument();
  });
});
