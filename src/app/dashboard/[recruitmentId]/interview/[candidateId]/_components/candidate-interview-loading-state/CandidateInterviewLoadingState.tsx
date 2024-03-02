import React from "react";

export default function CandidateInterviewLoadingState() {
  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-6 p-4 sm:mb-0 lg:flex-row lg:items-start lg:p-8">
      <div className="flex w-full basis-[40%] flex-col gap-2 lg:max-w-[350px]">
        <h2 className="h-[42px] w-[148px] animate-pulse rounded-lg border border-border bg-main-200" />
        <p className="h-[86px] w-full animate-pulse rounded-lg border border-border bg-main-200 text-black-600"></p>
        <div className="h-[212px] animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="flex justify-between border">
          <div className="h-[48px] w-[124px] animate-pulse rounded-lg border border-border bg-main-200" />
          <div className="h-[48px] w-[164px] animate-pulse rounded-lg border border-border bg-main-200" />
        </div>
      </div>
      <div className="flex h-full w-full basis-[60%] flex-col gap-4 rounded-lg border border-border bg-main-200" />
    </section>
  );
}
