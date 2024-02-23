import { Candidate } from "@prisma/client";
import dayjs from "dayjs";

export const findClosestInterview = (
  candidates: Candidate[],
): Candidate | undefined => {
  let candidate = candidates[0];
  const now = dayjs();

  for (let currentCandidate of candidates) {
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
