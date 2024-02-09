import Link from "next/link";
import React from "react";
import { RiAddFill } from "react-icons/ri";

export default function AddRecruitment() {
  return (
    <Link
      href={"dashboard/new"}
      className="border-border flex h-64 w-56 flex-col items-center justify-center gap-4 rounded-lg border bg-main-50 p-4 shadow-md transition-transform hover:scale-[1.02]"
    >
      <RiAddFill size={32} className="text-main-600" />
      <p>Add new recruitment</p>
    </Link>
  );
}
