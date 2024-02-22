"use client";

import React, { useState } from "react";
import { RiSearch2Line } from "react-icons/ri";
import ClearInput from "~/ui/clear-input/ClearInput";
import { pages } from "../side-bar/SideBar";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const handleSearch = (search: string) => setSearch(search);

  return (
    <div className="relative ml-auto w-full max-w-none sm:max-w-[360px]">
      <ClearInput
        name="searchBar"
        placeholder="Search"
        Icon={RiSearch2Line}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />
      {search && (
        <div className="absolute flex w-full flex-col gap-1 overflow-hidden rounded-lg border border-border bg-main-50 p-1 shadow-md">
          {pages
            .filter((page) =>
              page.name.toLowerCase().includes(search.toLowerCase()),
            )
            .map((page, i) => (
              <Link
                key={i}
                className="flex w-full items-center gap-4 rounded-md border-border bg-main-50 p-2 hover:bg-main-100"
                href={`/dashboard/${recruitmentId}/${page.href}`}
              >
                <page.icon className="" />
                {page.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
