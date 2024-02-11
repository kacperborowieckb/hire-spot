import { UserButton } from "@clerk/nextjs";
import React from "react";
import Logo from "~/ui/logo/Logo";

export default function Header() {
  return (
    <header className="flex w-full bg-main-50">
      <div className="border-border w-full max-w-[224px] border p-4">
        <Logo />
      </div>
      <div className="border-border flex w-full items-center gap-4 border border-l-0 p-4">
        <h1 className="flex-grow text-lg font-medium">
          Junior software developer
        </h1>
        <UserButton />
      </div>
    </header>
  );
}
