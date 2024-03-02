"use client";

import React from "react";
import Column from "../../../checked/_components/column/Column";
import CandidateCard from "../../../checked/_components/candidate-card/CandidateCard";
import type { Candidate } from "@prisma/client";
import { usePathname, useRouter } from "next/navigation";

export default function PickCandidateForSummary({
  interviewedCandidates,
}: {
  interviewedCandidates: Candidate[];
}) {
  const pathname = usePathname();
  const router = useRouter();

  const setSearchParams = (candidateId: string) => {
    const params = new URLSearchParams();
    params.set("candidate", candidateId);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Column title="Interviewed candidates" className="flex-grow">
      {interviewedCandidates.length > 0 ? (
        interviewedCandidates.map((candidate, i) => (
          <CandidateCard
            key={i}
            className="cursor-pointer"
            candidate={candidate}
            onClick={() => setSearchParams(candidate.id)}
          />
        ))
      ) : (
        <p className="text-center text-black-600">No candidates</p>
      )}
    </Column>
  );
}
