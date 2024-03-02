import Image from "next/image";
import React from "react";

export default function NoInterviews() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2">
      <Image
        alt="no interviews"
        src="/no-interviews.svg"
        width={0}
        height={0}
        className="h-[80px] w-[80px]"
      />

      <p className="text-center text-black-600">No interviews.</p>
    </div>
  );
}
