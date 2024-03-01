import React from "react";

export default function InterviewLoadingState() {
  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-6 p-4 sm:mb-0 md:flex-row md:items-stretch lg:p-8">
      <div className="flex w-min flex-col gap-4">
        <h2 className="h-[42px] w-[128px] animate-pulse rounded-lg border border-border bg-main-200" />
        <p className="h-[36px] w-full animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] flex-grow animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
      </div>
      <div className="flex flex-col gap-8">
        <div className="h-[320px] w-full animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="flex h-full min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
      </div>
    </section>
  );
}
