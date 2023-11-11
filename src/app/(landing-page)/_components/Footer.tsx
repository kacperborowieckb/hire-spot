"use client";

import Link from "next/link";
import React from "react";
import Logo from "~/app/ui/Logo";
import { RiLinkedinFill, RiGithubFill } from "react-icons/ri";
import NavLinks from "./NavLinks";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4 pb-8">
      <div className="flex justify-center gap-4">
        <div className="flex-grow sm:flex-grow-0">
          <Logo classes="sm:w-44 w-32" />
        </div>
        <div className="mx-8 hidden items-center justify-center gap-8 text-lg font-medium sm:flex ">
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <Link href={"https://github.com/kacperborowieckb"} target="_blank">
            <RiGithubFill className="hover:text-main-600 text-3xl transition-colors duration-300 sm:text-5xl" />
          </Link>
          <Link href={"/"}>
            <RiLinkedinFill className="hover:text-main-600 text-3xl transition-colors duration-300 sm:text-5xl" />
          </Link>
        </div>
      </div>
      <div className="text-medium flex justify-center gap-16 font-medium sm:hidden">
        <NavLinks />
      </div>
    </footer>
  );
}
