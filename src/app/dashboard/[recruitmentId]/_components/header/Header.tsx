import { UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "~/ui/logo/Logo";
import SearchBar from "../search-bar/SearchBar";

export default function Header() {
  // TODO : position title
  return (
    <header className="z-10 flex w-full bg-main-50 shadow-md">
      <div className="flex w-full max-w-[124px] items-center justify-center border border-border md:max-w-[224px]">
        <div className="px-1">
          <Logo />
        </div>
      </div>
      <div className="flex w-full items-center gap-4 border border-l-0 border-border p-2 lg:p-4">
        <h1 className="hidden flex-grow text-lg font-medium sm:block">
          Junior software developer
        </h1>
        <div className="ml-auto pl-2">
          <SearchBar />
        </div>
        <UserButton />
      </div>
    </header>
  );
}
