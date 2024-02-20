import Image from "next/image";
import React from "react";

export default function NoMoreCandidates() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      <div className="h-[186px] w-[286px]">
        <Image
          priority
          height={186}
          width={286}
          className="h-full w-full"
          alt="Candidate Not Found photo"
          src={"/no-more-candidates.svg"}
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-black-900">
        No more candidates
      </p>
      <p className="text-body text-center text-base text-black-600">
        All candidates for this position have been checked
      </p>
    </div>
  );
}
