import React from "react";
import Column from "./_components/column/Column";
import CandidateCard from "./_components/candidate-card/CandidateCard";

export default function CheckedPage() {
  return (
    <section className="mb-14 flex w-full flex-grow gap-8 overflow-x-scroll p-4 sm:mb-0 lg:p-8 min-[1090px]:overflow-x-hidden">
      <Column title="No" titleColor="text-red-400">
        {Array.from({ length: 5 }).map((_, i) => (
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
    </section>
  );
}
