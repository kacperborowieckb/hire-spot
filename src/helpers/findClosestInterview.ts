import type { Candidate } from "@prisma/client";
import dayjs from "dayjs";

export const findClosestInterview = (
  candidates: Candidate[],
): Candidate | undefined => {
  if (!candidates.length) return;
  let candidate = candidates[0];
  const now = dayjs();

  for (const currentCandidate of candidates) {
    if (
      dayjs(currentCandidate.scheduledFor).isBefore(candidate?.scheduledFor) &&
      dayjs(currentCandidate.scheduledFor).isAfter(now) &&
      currentCandidate.forInterview
    ) {
      candidate = currentCandidate;
    }
  }

  return candidate;
};
