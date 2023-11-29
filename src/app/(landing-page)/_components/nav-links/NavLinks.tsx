import Link from "next/link";
import React from "react";
import { fadeInAnimationVariants } from "~/app/utils/variants";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { MotionDiv } from "~/app/ui/motion-components/MotionComponents";

const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks({ toggleNav }: { toggleNav?: () => void }) {
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  const currentLinks = isSignedIn
    ? [...links, { name: "Dashboard", href: "/dashboard" }]
    : links;

  const linksContent = currentLinks.map(({ name, href }, i) => (
    <MotionDiv variants={fadeInAnimationVariants} key={i}>
      <Link
        href={href}
        onClick={toggleNav}
        className={`font-normal hover:text-main-600 ${
          pathname === href && "text-main-600"
        }`}
      >
        {name}
      </Link>
    </MotionDiv>
  ));

  return linksContent;
}
