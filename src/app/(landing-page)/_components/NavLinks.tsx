import React from "react";

const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function NavLinks() {
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

  return { linksContent };
}
