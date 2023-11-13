"use client";

import Link from "next/link";
import React from "react";
import { fadeInAnimationVariants } from "~/app/utils/variants";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks({ toggleNav }: { toggleNav?: () => void }) {
  const pathname = usePathname();
  const linksContent = links.map(({ name, href }, i) => (
    <motion.div variants={fadeInAnimationVariants} key={i}>
      <Link
        href={href}
        onClick={toggleNav}
        className={`hover:text-main-600 font-normal ${
          pathname === href && "text-main-600"
        }`}
      >
        {name}
      </Link>
    </motion.div>
  ));

  return linksContent;
}
