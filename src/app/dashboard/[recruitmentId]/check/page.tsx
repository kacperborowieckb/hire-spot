"use client";

import Button from "~/ui/button/Button";
import PDFView from "./_components/pdf-view/PDFView";
import RateButtons from "./_components/rate-buttons/RateButtons";
import { api } from "~/trpc/react";
import { useState } from "react";
import Spinner from "~/ui/Spinner";
import NoCandidateFound from "./_components/no-candidate-found/NoCandidateFound";
import NoMoreCandidates from "./_components/no-more-candidates/NoMoreCandidates";
import { usePathname, useRouter } from "next/navigation";

export default function CheckPage({
  params,
  searchParams,
}: {
  params: { recruitmentId: string };
  searchParams?: {
    candidateId: string;
    index: string;
  };
}) {
  const [index, setIndex] = useState<number>(0);
  const pathname = usePathname();
  const { replace } = useRouter();

  const { data: candidates = [], isLoading } =
    api.candidate.getUncheckedCandidatesByRecruitmentId.useQuery({
      recruitmentId: params.recruitmentId,
    });

  const currentCandidate = searchParams?.candidateId
    ? candidates.find((candidate) => candidate.id === searchParams.candidateId)
    : candidates[index];

  const skipResume = () => {
    if (index >= candidates.length - 1) {
      setIndex(0);
      setCandidateIdSearchParams(candidates[0]?.id);
    } else {
      setIndex(index + 1);
      setCandidateIdSearchParams(candidates[index + 1]?.id);
    }
  };

  const setCandidateIdSearchParams = (
    candidateId: string | undefined,
  ): void => {
    const params = new URLSearchParams(searchParams);

    candidateId
      ? params.set("candidateId", candidateId)
      : params.delete("candidateId");

    replace(`${pathname}?${params}`);
  };

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (candidates.length === 0)
    return (
      <section className="flex w-full">
        <NoMoreCandidates />
      </section>
    );

  return (
    <section className="flex w-full flex-col gap-8 p-4 lg:flex-row lg:p-8">
      {!currentCandidate ? (
        <NoCandidateFound />
      ) : (
        <>
          <div className="flex flex-col gap-4">
            <PDFView pdf={currentCandidate.cvUrl} />
            <RateButtons
              candidateId={currentCandidate.id}
              recruitmentId={params.recruitmentId}
              index={index}
              setIndex={setIndex}
              setCandidateIdSearchParams={setCandidateIdSearchParams}
            />
          </div>
          <div className="flex flex-col items-center gap-2 lg:items-start">
            <h2 className="text-2xl text-black-900">{currentCandidate.name}</h2>
            <p className="text-base text-black-600">
              {currentCandidate.description}
            </p>
            <Button
              variant="outline"
              className="mb-16 w-fit"
              onClick={skipResume}
            >
              Skip this resume
            </Button>
          </div>
        </>
      )}
    </section>
  );
}
