"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
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
    href: "/schedule",
    name: "Schedule interview",
  },
];

export default function SideBar() {
  const pathname = usePathname();
  const params = useParams<{ recruitmentId: string }>();

  const currentPage =
    pages.findLast((page) => pathname.endsWith(page.href))?.href || "/";

  const links = pages.map((page) => {
    const isCurrent = page.href === currentPage;

    return (
      <Link
        data-testid="sidebar-link"
        key={page.name}
        href={`/dashboard/${params.recruitmentId}${page.href}`}
        className={`text-black-90 group relative flex items-center hover:text-main-600 xl:gap-2 ${
          isCurrent && "text-main-600"
        }`}
      >
        {
          <page.icon
            className={`mx-auto group-hover:fill-main-600 xl:mx-0 ${
              isCurrent && "fill-main-600"
            }`}
            size={iconSize}
            fill={iconFill}
          />
        }
        <span className="hidden xl:block">{page.name}</span>
        {isCurrent && (
          <div className="absolute right-0 ml-auto hidden h-[24px] w-[2px] translate-x-[1px] rounded-md bg-main-600 sm:block" />
        )}
      </Link>
    );
  });

  return (
    <aside className="z-50 flex flex-1 border border-t-0 border-border bg-main-50 pt-2 sm:min-w-[64px] xl:min-w-[224px]">
      <div className="fixed bottom-4 left-1/2 flex -translate-x-1/2 gap-8 rounded-lg border border-border bg-main-100 p-2 shadow-lg sm:static sm:mt-4 sm:w-full sm:translate-x-0 sm:flex-col sm:border-none sm:bg-main-50 sm:p-0 sm:shadow-none xl:p-4 xl:pr-0">
        {links}
      </div>
    </aside>
  );
}
