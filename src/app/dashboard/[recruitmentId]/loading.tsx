import React from "react";

export default function DashboardHomeLoading() {
  return (
    <section className="mb-14 flex w-full flex-col gap-4 p-4 lg:gap-8 lg:p-8">
      <h1 className="block animate-pulse rounded-lg bg-main-200 text-center text-lg font-semibold text-black-900 sm:hidden" />
      <div className="grid h-min animate-pulse grid-cols-2 gap-4 accent-main-600 md:grid-cols-4 lg:gap-8">
        <div className="h-[148px] min-w-[164px] max-w-[354px] basis-full rounded-lg bg-main-200" />
        <div className="h-[148px] min-w-[164px] max-w-[354px] basis-full rounded-lg bg-main-200" />
        <div className="h-[148px] min-w-[164px] max-w-[354px] basis-full rounded-lg bg-main-200" />
        <div className="h-[148px] min-w-[164px] max-w-[354px] basis-full rounded-lg bg-main-200" />
      </div>
      <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
        <div className="h-[196px] basis-full rounded-lg bg-main-200" />
        <div className="h-[196px] basis-full rounded-lg bg-main-200" />
      </div>
    </section>
  );
}
