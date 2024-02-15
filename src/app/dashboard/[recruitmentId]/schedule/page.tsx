import React from "react";
import Column from "../checked/_components/column/Column";
import CandidateCard from "../checked/_components/candidate-card/CandidateCard";
import SearchCandidate from "./_components/search-candidate/SearchCandidate";
import ScheduleCandidate from "./_components/schedule-candidate/ScheduleCandidate";

export default function SchedulePage() {
  return (
    <section className="mb-14 flex w-full flex-grow gap-8 p-4 sm:mb-0 lg:p-8 ">
      <div className="flex flex-col">
        <SearchCandidate />
        <div className="flex flex-grow gap-8">
          <Column title="Yes" titleColor="text-main-400">
            {Array.from({ length: 2 }).map((_, i) => (
              <CandidateCard
                key={i}
                name="John Petrucci"
                desc="Software engineer with a lot of experience that are passionate about cats"
                applied="14-02-2024"
                candidateId="ID"
                interviewStage="No interview"
              />
            ))}
          </Column>
          <Column title="Strong yes" titleColor="text-main-600">
            {Array.from({ length: 7 }).map((_, i) => (
              <CandidateCard
                key={i}
                name="John Petrucci"
                desc="Software engineer with a lot of experience that are passionate about cats"
                applied="14-02-2024"
                candidateId="ID"
                interviewStage="No interview"
              />
            ))}
          </Column>
        </div>
      </div>
      <ScheduleCandidate />
    </section>
  );
}
