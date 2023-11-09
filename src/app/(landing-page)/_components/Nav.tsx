"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "~/app/ui/Button";
import Logo from "~/app/ui/Logo";

const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-8 sm:mx-4 sm:my-2 md:mx-24 md:my-4">
      <div className="grow">
        <Logo />
      </div>
      {links.map(({ name, href }, i) => (
        <Link
          href={href}
          key={i}
          className={`hover:text-main-600 text-lg font-normal ${
            pathname === href && "text-main-600"
          }`}
        >
          {name}
        </Link>
      ))}
      <Button variant="default">Sign in</Button>
    </nav>
  );
}
