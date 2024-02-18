import { render, screen } from "@testing-library/react";
import SideBar from "./SideBar";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn().mockReturnValue("/home"),
  useParams: jest.fn().mockReturnValue({ recruitmentId: "mockRecruitmentId" }),
}));

describe("SideBar", () => {
  it("Should render", () => {
    render(<SideBar />);

    const homeLink = screen.getByText(/Home/i);

    expect(homeLink).toBeInTheDocument();
  });
  it("Should render 4 links", () => {
    render(<SideBar />);

    const links = screen.getAllByTestId("sidebar-link");

    expect(links).toHaveLength(4);
  });
});
