"use client";

import type { Rating } from "@prisma/client";
import React, { type Dispatch, type SetStateAction, useEffect } from "react";
import { api } from "~/trpc/react";
import Button from "~/ui/button/Button";

type RateButtonsProps = {
  candidateId: string;
  recruitmentId: string;
  index: number;
  setIndex: Dispatch<SetStateAction<number>>;
  setCandidateIdSearchParams: (candidateId: string | undefined) => void;
};

export default function RateButtons({
  candidateId,
  recruitmentId,
  index,
  setIndex,
  setCandidateIdSearchParams,
}: RateButtonsProps) {
  const utils = api.useUtils();

  const { mutate, isLoading } = api.candidate.rateCandidate.useMutation({
    async onMutate(ratedCandidate) {
      await utils.candidate.getUncheckedCandidatesByRecruitmentId.cancel();

      const prevData =
        utils.candidate.getUncheckedCandidatesByRecruitmentId.getData({
          recruitmentId,
        });

      utils.candidate.getUncheckedCandidatesByRecruitmentId.setData(
        { recruitmentId },
        (candidates) => {
          const newCandidates = candidates
            ? candidates.filter(
                (candidate) => candidate.id !== ratedCandidate.candidateId,
              )
            : [];

          if (index <= newCandidates.length - 1) {
            setCandidateIdSearchParams(newCandidates[index]?.id);
          } else {
            setCandidateIdSearchParams(newCandidates[0]?.id);
            setIndex(0);
          }

          return newCandidates;
        },
      );

      return { prevData };
    },
    onError(_, __, ctx) {
      utils.candidate.getUncheckedCandidatesByRecruitmentId.setData(
        { recruitmentId },
        ctx?.prevData,
      );
    },
  });

  const rateCandidate = (rating: Rating) => mutate({ candidateId, rating });

  useEffect(() => {
    setCandidateIdSearchParams(candidateId);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex justify-center gap-10">
      <Button
        variant="error"
        onClick={() => rateCandidate("NO")}
        disabled={isLoading}
      >
        No
      </Button>
      <Button
        variant="outline"
        onClick={() => rateCandidate("YES")}
        disabled={isLoading}
      >
        Yes
      </Button>
      <Button
        variant="default"
        onClick={() => rateCandidate("STRONG_YES")}
        disabled={isLoading}
      >
        Strong yes
      </Button>
    </div>
  );
}
