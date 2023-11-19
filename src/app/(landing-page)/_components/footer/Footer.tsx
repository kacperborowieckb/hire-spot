"use client";

import Link from "next/link";
import React from "react";
import Logo from "~/app/ui/logo/Logo";
import { RiLinkedinFill, RiGithubFill } from "react-icons/ri";
import NavLinks from "../nav-links/NavLinks";

export default function Footer() {
  return (
    <footer className="mt-auto flex flex-col gap-4 p-4 pb-8">
      <div className="flex justify-center gap-4">
        <div>
          <Logo classes="sm:w-44 w-32" />
        </div>
        <div className="mx-8 hidden items-center justify-center gap-6 text-lg font-medium md:flex ">
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <Link href={"https://github.com/kacperborowieckb"} target="_blank">
            <RiGithubFill className="text-3xl transition-colors duration-300 hover:text-main-600 sm:text-5xl" />
          </Link>
          <Link href={"/"}>
            <RiLinkedinFill className="text-3xl transition-colors duration-300 hover:text-main-600 sm:text-5xl" />
          </Link>
        </div>
      </div>
      <div className="text-medium flex justify-center gap-6 font-medium md:hidden">
        <NavLinks />
      </div>
    </footer>
  );
}
