"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import {
  RiCalendarTodoLine,
  RiCheckboxCircleLine,
  RiHome3Line,
  RiSearch2Line,
} from "react-icons/ri";

const iconSize = 22;
const iconFill = "rgb(49 49 49)";

const pages: { icon: IconType; href: string; name: string }[] = [
  {
    icon: RiHome3Line,
    href: "/",
    name: "Home",
  },
  {
    icon: RiSearch2Line,
    href: "/check",
    name: "Check candidates",
  },
  {
    icon: RiCheckboxCircleLine,
    href: "/checked",
    name: "Checked",
  },
  {
    icon: RiCalendarTodoLine,
    href: "schedule",
    name: "Schedule interview",
  },
];

export default function SideBar() {
  const pathname = usePathname();

  const links = pages.map((page) => {
    let isCurrent = pathname.replaceAll("/", "").includes(page.href);

    if (!isCurrent && page.href === "/") isCurrent = true;
    return (
      <Link
        href={page.href}
        className={`text-black-90 group flex items-center gap-2 hover:text-main-600 ${
          isCurrent && "text-main-600"
        }`}
      >
        {
          <page.icon
            className={`group-hover:fill-main-600 ${
              isCurrent && "fill-main-600"
            }`}
            size={iconSize}
            fill={iconFill}
          />
        }
        {page.name}
        {isCurrent && (
          <div className="ml-auto h-full w-[2px] translate-x-[1px] rounded-md bg-main-600" />
        )}
      </Link>
    );
  });

  return (
    <aside className="border-border flex max-w-[224px] flex-1 border border-t-0 bg-main-50">
      <div className="mt-4 flex w-full flex-col gap-4 p-4 pr-0">{links}</div>
    </aside>
  );
}
