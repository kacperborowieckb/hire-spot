import { UserButton } from "@clerk/nextjs";
import React from "react";
import LogoWithoutText from "~/ui/logo-without-text/LogoWithoutText";
import Logo from "~/ui/logo/Logo";

export default function Header() {
  // TODO : position title
  return (
    <header className="flex w-full bg-main-50">
      <div className="flex w-full max-w-[64px] items-center justify-center border border-border md:max-w-[224px]">
        <div className="hidden md:block">
          <Logo />
        </div>
        <div className="block md:hidden">
          <LogoWithoutText />
        </div>
      </div>
      <div className="flex w-full items-center gap-4 border border-l-0 border-border p-4">
        <h1 className="hidden flex-grow text-lg font-medium sm:block">
          Junior software developer
        </h1>
        <div className="ml-auto">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
