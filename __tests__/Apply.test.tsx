import { screen, render } from "@testing-library/react";
import { inferProcedureOutput } from "@trpc/server";
import Apply from "~/app/apply/[recruitmentId]/page";
import { AppRouter } from "~/server/api/root";
import { api } from "../src/trpc/server";
import { act } from "react-dom/test-utils";
import { notFound } from "next/navigation";

//@ts-ignore
window.XMLHttpRequest = jest.fn();

const mockQuery = api.recruitment.getRecruitmentById.query as jest.Mock;

jest.mock("next/navigation", () => ({
  notFound: jest.fn(),
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));
jest.mock("uploadthing/server");

const mockOutput: inferProcedureOutput<
  AppRouter["recruitment"]["getRecruitmentById"]
> = {
  creator: "mockCreator",
  position: "mockPosition",
  description: "mockDescription",
};

describe("Apply page", () => {
  it("Should navigate to not found when no recruitment found", async () => {
    mockQuery.mockReturnValue({});
    await act(async () =>
      render(await Apply({ params: { recruitmentId: "mockRecruitment" } })),
    );

    expect(notFound).toHaveBeenCalled();
  });

  it("Should render heading with correct position", async () => {
    mockQuery.mockReturnValue(mockOutput);
    await act(async () =>
      render(await Apply({ params: { recruitmentId: "mockRecruitment" } })),
    );

    const heading = screen.getByRole("heading", { name: /mockPosition/i });

    expect(heading).toBeInTheDocument();
  });

  it("Should render information about creator", async () => {
    mockQuery.mockReturnValue(mockOutput);
    await act(async () =>
      render(await Apply({ params: { recruitmentId: "mockRecruitment" } })),
    );

    const creator = screen.getByText(/mockCreator/i);

    expect(creator).toBeInTheDocument();
  });

  it("Should not render desc when page loads", async () => {
    mockQuery.mockReturnValue(mockOutput);
    await act(async () =>
      render(await Apply({ params: { recruitmentId: "mockRecruitment" } })),
    );

    const desc = screen.queryByText(/mockDesc/i);

    expect(desc).not.toBeInTheDocument();
  });
});
