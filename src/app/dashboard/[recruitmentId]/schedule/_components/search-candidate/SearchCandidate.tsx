"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import ClearInput from "~/ui/clear-input/ClearInput";

export default function SearchCandidate() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div>
      <ClearInput
        label="search"
        labelClasses="sr-only"
        placeholder="Search for candidate"
        name="searchCandidate"
        Icon={RiSearch2Line}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
