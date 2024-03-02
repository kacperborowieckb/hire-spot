import React from "react";

export default function ScheduleLoadingState() {
  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-2 p-4 sm:mb-0 sm:gap-8 md:flex-row md:items-stretch lg:p-8">
      <div className="flex w-min flex-col gap-2">
        <div className="w-fill h-[36px] animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="flex flex-grow gap-4">
          <div className="hidden min-h-[368px] min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg lg:flex" />
          <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
        </div>
      </div>
      <div className="flex min-w-[300px] flex-col gap-4">
        <h2 className="h-[42px] w-[128px] animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="mx-auto h-[130px] w-[266px] animate-pulse justify-center rounded-lg border border-border bg-main-200" />
        <div className="h-[180px] w-full animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="h-[36px] w-3/4 animate-pulse rounded-lg border border-border bg-main-200" />
        <div className="h-[48px] w-full animate-pulse rounded-lg border border-border bg-main-200" />
      </div>
    </section>
  );
}
