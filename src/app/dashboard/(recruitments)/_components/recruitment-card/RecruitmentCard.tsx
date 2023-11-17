import Link from "next/link";
import React from "react";

export default function RecruitmentCard() {
  return (
    <Link
      href={"/dashboard/id"}
      className="flex h-64 w-56 flex-col gap-4 rounded-lg border border-main-200 bg-main-50 p-4 text-center shadow-md transition-transform hover:scale-[1.02]"
    >
      <h3 className="my-2 truncate font-semibold">Junior DevOps engineer </h3>
      <hr />
      <p>
        <span className="font-bold text-main-600">36</span> candidates
      </p>
      <p>Started at: 2023-11-16</p>
      <p>
        <span className="font-bold text-main-600">26</span> candidates to check
      </p>
    </Link>
  );
}
