import { UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "~/ui/logo/Logo";
import { api } from "~/trpc/server";
import SearchBar from "../search-bar/SearchBar";

export default async function Header({
  recruitmentId,
}: {
  recruitmentId: string;
}) {
  const { position } = await api.recruitment.getRecruitmentById.query({
    id: recruitmentId,
  });

  return (
    <header className="z-10 flex w-full bg-main-50 shadow-md">
      <div className="flex w-full max-w-[124px] items-center justify-center border border-border md:max-w-[224px]">
        <div className="px-1">
          <Logo />
        </div>
      </div>
      <div className="flex w-full items-center gap-4 border border-l-0 border-border px-2 py-1 sm:px-4 sm:py-2">
        <h1 className="hidden w-full text-lg font-medium sm:block">
          {position}
        </h1>
        <div className="w-full pl-2">
          <SearchBar />
        </div>
        <UserButton />
      </div>
    </header>
  );
}
