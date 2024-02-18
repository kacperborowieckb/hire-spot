import { InterviewStage, Rating } from "@prisma/client";

type TCandidatesArray = Required<
  { rating?: string; interviewStage?: string }[]
>;

export const countCandidates = (
  candidates: TCandidatesArray,
  countBy: Rating | InterviewStage,
) => {
  return candidates.reduce((acc, candidate) => {
    return candidate.rating === countBy || candidate.interviewStage === countBy
      ? acc + 1
      : acc;
  }, 0);
};
