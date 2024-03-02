import { render, screen } from "@testing-library/react";
import RecruitmentCard from "./RecruitmentCard";

const recruitmentCardData = {
  allCandidates: 4,
  position: "mockPosition",
  recruitmentId: "mockRecruitmentId",
  startedAt: "mockStartedAt",
  uncheckedCandidates: 2,
};

const recruitmentCard = (
  <RecruitmentCard
    allCandidates={recruitmentCardData.allCandidates}
    position={recruitmentCardData.position}
    recruitmentId={recruitmentCardData.recruitmentId}
    startedAt={recruitmentCardData.startedAt}
    uncheckedCandidates={recruitmentCardData.uncheckedCandidates}
  />
);

describe("RecruitmentCard", () => {
  it("Should contain information about number of all candidates", () => {
    render(recruitmentCard);

    const allCandidatesInfo = screen.getByText(
      recruitmentCardData.allCandidates,
    );

    expect(allCandidatesInfo).toBeInTheDocument();
  });

  it("Should contain information about position", () => {
    render(recruitmentCard);

    const position = screen.getByText(recruitmentCardData.position);

    expect(position).toBeInTheDocument();
  });

  it("Should contain information when recruitment started", () => {
    render(recruitmentCard);

    const startedAt = screen.getByText(/mockStartedAt/i);

    expect(startedAt).toBeInTheDocument();
  });

  it("Should contain information about number of unchecked candidates", () => {
    render(recruitmentCard);

    const uncheckedCandidates = screen.getByText(
      recruitmentCardData.uncheckedCandidates,
    );

    expect(uncheckedCandidates).toBeInTheDocument();
  });
});
