"use client";

import React, { useState } from "react";
import Column from "../checked/_components/column/Column";
import CandidateCard from "../checked/_components/candidate-card/CandidateCard";
import SearchCandidate from "./_components/search-candidate/SearchCandidate";
import ScheduleCandidate from "./_components/schedule-candidate/ScheduleCandidate";
import Tabs from "./_components/tabs/Tabs";
import { filterCandidateByRating } from "~/helpers/filterCandidatesByRating";
import { api } from "~/trpc/react";
import { usePathname, useRouter } from "next/navigation";

export default function SchedulePage({
  params: { recruitmentId },
  searchParams,
}: {
  params: { recruitmentId: string };
  searchParams: { candidate?: string; search?: string };
}) {
  const { candidate: candidateId, search } = searchParams;
  const router = useRouter();
  const pathname = usePathname();
  const { data: candidates = [], isLoading } =
    api.candidate.getCandidatesByRecruitmentId.useQuery({
      recruitmentId: recruitmentId,
    });

  const [tab, setTab] = useState<"yes" | "strongYes" | "both">("both");

  const yesCandidates = filterCandidateByRating(candidates, "YES");
  const strongYesCandidates = filterCandidateByRating(candidates, "STRONG_YES");

  const pickedCandidate = candidates.find(
    (candidate) => candidate.id === candidateId,
  );

  const pickCandidate = (candidateId: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("candidate", candidateId);
    router.replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-2 p-4 sm:mb-0 sm:gap-8 md:flex-row md:items-stretch lg:p-8">
      <h1 className="block text-center text-lg font-semibold text-black-900 sm:hidden">
        Junior software developer
      </h1>
      <div className="flex w-min flex-col gap-2">
        <SearchCandidate />
        <Tabs tab={tab} setTab={setTab} />
        <div className="flex flex-grow gap-4">
          {(tab === "yes" || tab === "both") && (
            <Column title="Yes" titleColor="text-main-400">
              {yesCandidates.length > 0 ? (
                yesCandidates
                  .filter((candidate) =>
                    search
                      ? candidate.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        candidate.description
                          ?.toLowerCase()
                          .includes(search.toLowerCase())
                      : true,
                  )
                  .map((candidate, i) => (
                    <CandidateCard
                      key={i}
                      candidate={candidate}
                      onClick={() => pickCandidate(candidate.id)}
                      className="cursor-pointer"
                    />
                  ))
              ) : (
                <p className="text-center text-black-600">No candidates</p>
              )}
            </Column>
          )}
          {(tab === "strongYes" || tab === "both") && (
            <Column title="Strong yes" titleColor="text-main-600">
              {strongYesCandidates.length > 0 ? (
                strongYesCandidates
                  .filter((candidate) =>
                    search
                      ? candidate.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        candidate.description
                          ?.toLowerCase()
                          .includes(search.toLowerCase())
                      : true,
                  )
                  .map((candidate, i) => (
                    <CandidateCard
                      key={i}
                      candidate={candidate}
                      onClick={() => pickCandidate(candidate.id)}
                      className="cursor-pointer"
                    />
                  ))
              ) : (
                <p className="text-center text-black-600">No candidates</p>
              )}
            </Column>
          )}
        </div>
      </div>
      <ScheduleCandidate pickedCandidate={pickedCandidate} />
    </section>
  );
}
