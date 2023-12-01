import React from "react";

export default function NewRecruitmentLoading() {
  return (
    <main className="mx-6 my-8 flex h-full justify-center gap-8 lg:mx-24 lg:justify-start">
      <div className="flex max-w-lg flex-grow flex-col gap-4 p-8">
        <div className="h-12 animate-pulse rounded-lg bg-main-200"></div>
        <div className="h-24 animate-pulse rounded-lg bg-main-200"></div>
        <div className="h-12 animate-pulse rounded-lg bg-main-200"></div>
        <div className="h-64 animate-pulse rounded-lg bg-main-200"></div>
        <div className="h-12 animate-pulse rounded-lg bg-main-200"></div>
      </div>
    </main>
  );
}
