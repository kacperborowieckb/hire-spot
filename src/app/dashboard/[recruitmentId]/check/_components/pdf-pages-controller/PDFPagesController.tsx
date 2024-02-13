import React from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";

type PDFPagesControllerProps = {
  page: number;
  numPages: number;
  next: () => void;
  previous: () => void;
};

export default function PDFPagesController({
  page,
  numPages,
  next,
  previous,
}: PDFPagesControllerProps) {
  return (
    <div className="mx-auto flex h-14 w-48 rounded-md border border-border bg-main-50">
      <button
        onClick={previous}
        disabled={page <= 1}
        className="flex basis-[30%] cursor-pointer items-center justify-center border-r border-border hover:bg-main-100 active:bg-main-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <RiArrowLeftDoubleLine />
      </button>
      <div className="flex basis-[40%] items-center justify-center bg-main-100">
        {page}
        <span className="mx-[1px]">/</span>
        {numPages}
      </div>
      <button
        onClick={next}
        disabled={page >= numPages}
        className="flex basis-[30%] cursor-pointer items-center justify-center border-l border-border hover:bg-main-100 active:bg-main-200 disabled:cursor-not-allowed disabled:opacity-30"
      >
        <RiArrowRightDoubleLine />
      </button>
    </div>
  );
}
