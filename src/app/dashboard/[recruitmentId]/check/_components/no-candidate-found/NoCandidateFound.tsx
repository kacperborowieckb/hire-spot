import Image from "next/image";
import React from "react";

export default function NoCandidateFound() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1">
      <div className="h-[186px] w-[286px]">
        <Image
          priority
          height={186}
          width={286}
          className="h-full w-full"
          alt="Candidate Not Found photo"
          src={"/not-found.svg"}
        />
      </div>
      <p className="mt-4 text-lg font-semibold text-black-900">
        No candidate found
      </p>
      <p className="text-body text-center text-base text-black-600">
        May have been checked or may not have been part of this recruitment
      </p>
    </div>
  );
}
