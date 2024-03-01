import React from "react";

export default function SummaryLoading() {
  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center justify-center gap-6 p-4 sm:mb-0 lg:flex-row lg:items-stretch lg:justify-start lg:p-8">
      <div className="flex w-full max-w-[380px] flex-col items-center gap-4 lg:w-min lg:max-w-none lg:items-stretch">
        <h2 className="h-[42px] w-[148px] animate-pulse rounded-lg border border-border bg-main-200" />
        <p className="h-[86px] w-full animate-pulse rounded-lg border border-border bg-main-200 text-black-600"></p>
        <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] flex-grow animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
      </div>
      <div className="flex w-full max-w-[668px] flex-col gap-2">
        <h2 className="h-[42px] w-[148px] animate-pulse rounded-lg border border-border bg-main-200" />
        <p className="h-[86px] w-full animate-pulse rounded-lg border border-border bg-main-200 text-black-600" />
        <h2 className="h-[36px] w-[148px] animate-pulse rounded-lg border border-border bg-main-200" />
        <p className="h-[124px] w-full animate-pulse rounded-lg border border-border bg-main-200 text-black-600" />
        <div className="flex h-full basis-[60%] flex-col gap-4 rounded-lg border border-border bg-main-200" />
      </div>
    </section>
  );
}
