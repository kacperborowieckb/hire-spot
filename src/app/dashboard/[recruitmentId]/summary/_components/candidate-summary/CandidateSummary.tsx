import { Candidate } from "@prisma/client";
import React from "react";
import PDFView from "../../../check/_components/pdf-view/PDFView";
import Image from "next/image";

export default function CandidateSummary({
  candidate,
}: {
  candidate?: Candidate;
}) {
  return (
    <div className="flex w-full flex-col gap-8 px-2 sm:px-4 md:px-8 lg:px-0">
      {candidate ? (
        <div>
          <h2 className="text-xl font-semibold text-black-900">
            {candidate.name}
          </h2>
          <p className="mb-2 text-base text-black-600">
            {candidate.description}
          </p>
          <h2 className="text-lg font-semibold text-black-900">
            Interview summary:
          </h2>
          <p className="mb-2 text-base text-black-600">{candidate.summary}</p>
          <PDFView pdf={candidate.cvUrl} />
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2">
          <Image
            src={"/no-candidate-selected.svg"}
            alt="no candidate selected image"
            width={0}
            height={0}
            className="h-[208px] w-[280px]"
          />
          <p className="text-lg text-black-600">No candidate selcted</p>
        </div>
      )}
    </div>
  );
}
