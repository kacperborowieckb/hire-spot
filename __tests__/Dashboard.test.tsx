import Dashboard from "~/app/dashboard/(recruitments)/page";
import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { api } from "~/trpc/server";
import { AppRouter } from "~/server/api/root";
import { inferProcedureOutput } from "@trpc/server";

const mockQuery = api.recruitment.getAllRecruitmentData.query as jest.Mock;

jest.mock("uploadthing/server");
jest.mock("../src/trpc/server", () => {
  return {
    api: {
      recruitment: {
        getAllRecruitmentData: { query: jest.fn() },
      },
    },
  };
});
describe("Dashboard", () => {
  it("Should not render any recruitment cards", async () => {
    mockQuery.mockReturnValue([]);
    await act(async () => render(await Dashboard()));

    const cards = screen.queryAllByTestId("recruitment-card");

    expect(cards).toHaveLength(0);
  });

  it("Should render add new recruitment card", async () => {
    mockQuery.mockReturnValue([]);
    await act(async () => render(await Dashboard()));

    const addNewRecruitmentCard = screen.getByText(/add new recruitment/i);

    expect(addNewRecruitmentCard).toBeInTheDocument();
  });

  it("Should render correct amount of recruitments card", async () => {
    const mockQueryOutput: inferProcedureOutput<
      AppRouter["recruitment"]["getAllRecruitmentData"]
    > = [
      {
        candidates: 4,
        createdAt: new Date(),
        id: "mockId",
        position: "mockPosition",
        uncheckedCandidates: 2,
      },
      {
        candidates: 4,
        createdAt: new Date(),
        id: "secondMockId",
        position: "mockPosition",
        uncheckedCandidates: 2,
      },
    ];
    mockQuery.mockReturnValue(mockQueryOutput);
    await act(async () => render(await Dashboard()));

    const cards = screen.getAllByTestId("recruitment-card");

    expect(cards).toHaveLength(2);
  });
});
