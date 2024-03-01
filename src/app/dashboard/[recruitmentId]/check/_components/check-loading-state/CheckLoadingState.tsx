import React from "react";

export default function CheckLoadingState() {
  return (
    <section className="flex w-full flex-col gap-8 p-4 lg:flex-row lg:p-8">
      <div className="flex h-full basis-[60%] flex-col gap-4 rounded-lg border border-border bg-main-200" />
      <div className="flex h-[248px] basis-[40%] flex-col items-center gap-2 rounded-lg border border-border bg-main-200 lg:items-start" />
    </section>
  );
}
