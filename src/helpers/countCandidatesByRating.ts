import { Rating } from "@prisma/client";

type TCandidatesArray = Required<{ rating?: string }[]>;

export const countCandidatesByRating = (
  candidates: TCandidatesArray,
  rating: Rating | Rating[],
) => {
  return candidates.reduce((acc, candidate) => {
    if (Array.isArray(rating)) {
      return rating.some((val) => candidate.rating === val) ? acc + 1 : acc;
    }
    return candidate.rating === rating ? acc + 1 : acc;
  }, 0);
};
