import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { act } from "react-dom/test-utils";
import { api } from "~/trpc/server";
import { api as clientApi } from "~/trpc/react";

const mockGetRecruitmentById = api.recruitment.getRecruitmentById
  .query as jest.Mock;

(
  clientApi.candidate.getCandidatesByRecruitmentId.useQuery as jest.Mock
).mockReturnValue([]);

jest.mock("next/navigation", () => ({
  useParams: () => ({ recruitmentId: "mockRecruitmentId" }),
}));

mockGetRecruitmentById.mockReturnValue({ position: "mockPositionTitle" });

const renderHeader = async () =>
  // eslint-disable-next-line
  await act(async () => render(await Header({ recruitmentId: "mockId" })));

describe("Header", () => {
  it("Should render correct position title", async () => {
    await renderHeader();

    const positionTitle = screen.getByText(/mockPositionTitle/i);

    expect(positionTitle).toBeInTheDocument();
  });

  it("Should render logo", async () => {
    await renderHeader();

    const logo: HTMLImageElement = screen.getByRole("img");

    expect(logo).toBeInTheDocument();
    expect(logo.src).toContain("/logo.svg");
  });
  it("Should render search bar", async () => {
    await renderHeader();

    const searchBar = screen.getByPlaceholderText(/search/i);

    expect(searchBar).toBeInTheDocument();
  });
});
