import React from "react";
import { api } from "~/trpc/server";
import PickCandidateForSummary from "./_components/pick-candidate-for-summary/PickCandidateForSummary";
import CandidateSummary from "./_components/candidate-summary/CandidateSummary";

export default async function Summary({
  params: { recruitmentId },
  searchParams: { candidate: candidateId },
}: {
  params: { recruitmentId: string };
  searchParams: { candidate?: string };
}) {
  const candidates = await api.candidate.getCandidatesByRecruitmentId.query({
    recruitmentId,
  });

  const interviewedCandidates = candidates.filter(
    (candidate) => candidate.interviewStage === "COMPLETED",
  );

  const candidateForSummary = interviewedCandidates.find(
    (candidate) => candidate.id === candidateId,
  );

  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center justify-center gap-6 p-4 sm:mb-0 lg:flex-row lg:items-stretch lg:justify-start lg:p-8">
      <div className="flex w-full max-w-[380px] flex-col items-center lg:w-min lg:max-w-none lg:items-stretch">
        <h2 className="text-lg font-semibold">Select candidate</h2>
        <p className="mb-2 text-center text-base text-black-600 lg:text-left">
          Click on candidate to show all information about him and summary given
          after an interview
        </p>
        <PickCandidateForSummary
          interviewedCandidates={interviewedCandidates}
        />
      </div>

      <CandidateSummary candidate={candidateForSummary} />
    </section>
  );
}
