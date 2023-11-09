"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "~/app/ui/Button";
import Logo from "~/app/ui/Logo";
import { RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import { useToggle } from "~/app/hooks/useToggle";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInAnimationVariants, openNavVariants } from "~/app/utils/variants";

const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isNavOpen, toggleNav] = useToggle();
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

  return (
    <nav className="mx-6 my-4 flex items-center gap-4 sm:gap-8 md:mx-24">
      <div className="grow">
        <Logo />
      </div>
      <div className="hidden items-center gap-8 text-lg sm:flex">
        {linksContent}
      </div>
      <div className="border-main-300 bg-main-100 hover:bg-main-300 hover:border-main-500 active:bg-main-200 active:border-main-400 rounded-lg border sm:hidden">
        <RiMenu5Fill
          className="text-main-600 m-1.5 sm:hidden"
          size={24}
          onClick={toggleNav}
        />
      </div>
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="bg-main-50 absolute inset-x-0 inset-y-0 z-50 sm:hidden"
            variants={openNavVariants}
            initial="initial"
            animate="animate"
            exit="hide"
          >
            <div className="border-main-300 bg-main-100 hover:bg-main-300 hover:border-main-500 active:bg-main-200 active:border-main-400  absolute right-8 top-8 rounded-lg border">
              <RiCloseFill
                className="text-main-600 m-1.5  sm:hidden"
                size={24}
                onClick={toggleNav}
              />
            </div>
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-8 text-2xl font-bold"
            >
              {linksContent}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button variant="default">Sign in</Button>
    </nav>
  );
}
