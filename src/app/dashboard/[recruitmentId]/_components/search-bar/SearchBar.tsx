"use client";

import React, { useState } from "react";
import { RiSearch2Line, RiUser3Fill } from "react-icons/ri";
import ClearInput from "~/ui/clear-input/ClearInput";
import { pages } from "../side-bar/SideBar";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "~/trpc/react";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("");
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const { data: candidates = [] } =
    api.candidate.getCandidatesByRecruitmentId.useQuery({ recruitmentId });

  const handleSearch = (search: string) => setSearch(search);

  const searchItems = [
    ...pages
      .filter((page) => page.name.toLowerCase().includes(search.toLowerCase()))
      .map((page, i) => (
        <Link
          key={i}
          className="flex items-center gap-1 rounded-md border-border bg-main-50 p-2 hover:bg-main-100"
          href={`/dashboard/${recruitmentId}/${page.href}`}
        >
          <page.icon className="mr-2 min-w-max fill-black-900" />
          <p className="truncate text-black-900">{page.name}</p>
        </Link>
      )),
    ...candidates
      .filter((candidate) =>
        candidate.name.toLowerCase().includes(search.toLowerCase()),
      )
      .map((candidate) => {
        const params = new URLSearchParams({ candidate: candidate.id });

        return (
          <Link
            key={candidate.id}
            className="flex w-full items-center gap-1 rounded-md border-border bg-main-50 p-2 hover:bg-main-100"
            href={`/dashboard/${recruitmentId}/schedule?${params}`}
          >
            <RiUser3Fill className="mr-2 min-w-max fill-black-900" />
            <span className="text-black-600">Schedule:</span>{" "}
            <p className="truncate text-black-900">{candidate.name}</p>
          </Link>
        );
      }),
  ];

  return (
    <div className="group relative ml-auto w-full max-w-none sm:max-w-[360px]">
      <ClearInput
        name="searchBar"
        placeholder="Search"
        autoComplete="off"
        Icon={RiSearch2Line}
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {search && (
        <div className="absolute hidden w-full flex-col gap-1 rounded-lg border border-border bg-main-50 p-1 shadow-md group-focus-within:flex">
          {searchItems.length > 0 ? (
            searchItems
          ) : (
            <p className="mx-auto p-2 text-black-600">No results.</p>
          )}
        </div>
      )}
    </div>
  );
}
