import React from "react";
import Column from "./_components/column/Column";
import CandidateCard from "./_components/candidate-card/CandidateCard";
import { filterCandidateByRating } from "~/helpers/filterCandidatesByRating";
import { api } from "~/trpc/server";

export default async function CheckedPage({
  params: { recruitmentId },
}: {
  params: { recruitmentId: string };
}) {
  const candidates = await api.candidate.getCandidatesByRecruitmentId.query({
    recruitmentId,
  });

  const noCandidates = filterCandidateByRating(candidates, "NO");
  const yesCandidates = filterCandidateByRating(candidates, "YES");
  const strongYesCandidates = filterCandidateByRating(candidates, "STRONG_YES");

  //TODO possibility of changing rating

  return (
    <section className="mb-14 flex w-full flex-grow gap-8 overflow-x-scroll p-4 sm:mb-0 lg:p-8 min-[1090px]:overflow-x-hidden">
      <Column title="No" titleColor="text-red-400">
        {noCandidates.length > 0 ? (
          noCandidates.map((candidate, i) => (
            <CandidateCard key={i} candidate={candidate} />
          ))
        ) : (
          <p className="text-center text-black-600">No candidates</p>
        )}
      </Column>
      <Column title="Yes" titleColor="text-main-400">
        {yesCandidates.length > 0 ? (
          yesCandidates.map((candidate, i) => (
            <CandidateCard key={i} candidate={candidate} />
          ))
        ) : (
          <p className="text-center text-black-600">No candidates</p>
        )}
      </Column>
      <Column title="Strong yes" titleColor="text-main-600">
        {strongYesCandidates.length > 0 ? (
          strongYesCandidates.map((candidate, i) => (
            <CandidateCard key={i} candidate={candidate} />
          ))
        ) : (
          <p className="text-center text-black-600">No candidates.</p>
        )}
      </Column>
    </section>
  );
}
