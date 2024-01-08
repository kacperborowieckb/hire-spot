type TCandidatesArray = Required<{ rating: string }[]>;

export const countUncheckedCandidates = (candidates: TCandidatesArray) => {
  return candidates.reduce(
    (acc, candidate) => (candidate.rating === "UNCHECKED" ? acc + 1 : acc),
    0,
  );
};
