import React from "react";

export default function CandidateInterview({
  params: { candidateId },
}: {
  params: { candidateId: string };
}) {
  return <div>CandidateInterview {candidateId}</div>;
}
