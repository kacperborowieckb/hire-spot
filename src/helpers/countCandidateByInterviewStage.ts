import { InterviewStage, Rating } from "@prisma/client";

type TCandidatesArray = Required<{ interviewStage?: string }[]>;

export const countCandidatesByInterviewStage = (
  candidates: TCandidatesArray,
  interviewStage: InterviewStage | InterviewStage[],
) => {
  return candidates.reduce((acc, candidate) => {
    if (Array.isArray(interviewStage)) {
      return interviewStage.some((val) => candidate.interviewStage === val)
        ? acc + 1
        : acc;
    }
    return candidate.interviewStage === interviewStage ? acc + 1 : acc;
  }, 0);
};
