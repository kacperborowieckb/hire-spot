import React from "react";

export default function RecruitmentCardSkeleton() {
  return (
    <>
      {Array(4).map((_) => (
        <div
          role="status"
          className="bg-sl h-64 w-56 animate-pulse rounded-lg bg-gray-400"
        >
          <span className="sr-only">Loading...</span>
        </div>
      ))}
    </>
  );
}
