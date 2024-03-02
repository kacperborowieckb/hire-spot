import React from "react";

export default function CheckedPageLoading() {
  return (
    <section className="mb-14 flex w-full flex-grow gap-8 overflow-x-scroll p-4 sm:mb-0 lg:p-8 min-[1090px]:overflow-x-hidden">
      <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
      <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
      <div className="flex min-h-[368px] min-w-[300px] max-w-[300px] animate-pulse flex-col gap-4 rounded-md border border-border bg-main-200 p-4 shadow-lg" />
    </section>
  );
}
