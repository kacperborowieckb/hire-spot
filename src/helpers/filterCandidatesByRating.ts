import type { Candidate, Rating } from "@prisma/client";

export const filterCandidateByRating = (
  candidates: Candidate[],
  rating: Rating,
) => {
  return candidates.filter((candidate) => candidate.rating === rating);
};
