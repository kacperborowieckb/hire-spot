"use client";

import React, { useState } from "react";
import Column from "../checked/_components/column/Column";
import CandidateCard from "../checked/_components/candidate-card/CandidateCard";
import SearchCandidate from "./_components/search-candidate/SearchCandidate";
import ScheduleCandidate from "./_components/schedule-candidate/ScheduleCandidate";
import Tabs from "./_components/tabs/Tabs";

export default function SchedulePage() {
  const [tab, setTab] = useState<"yes" | "strongYes" | "both">("both");

  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-4 p-4 sm:mb-0 sm:gap-8 md:flex-row md:items-stretch lg:p-8">
      <h1 className="block text-center text-lg font-semibold text-black-900 sm:hidden">
        Junior software developer
      </h1>
      <div className="flex w-min flex-col">
        <SearchCandidate />
        <Tabs tab={tab} setTab={setTab} />
        <div className="flex flex-grow gap-4">
          {(tab === "yes" || tab === "both") && (
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
          )}
          {(tab === "strongYes" || tab === "both") && (
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
          )}
        </div>
      </div>
      <ScheduleCandidate />
    </section>
  );
}
