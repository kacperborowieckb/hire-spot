"use client";

import Button from "~/app/ui/Button";
import Logo from "~/app/ui/Logo";
import { RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import { useToggle } from "~/app/hooks/useToggle";
import { motion, AnimatePresence } from "framer-motion";
import { openNavVariants } from "~/app/utils/variants";
import NavLinks from "./NavLinks";
import IconButton from "~/app/ui/IconButton";

export const links: { name: string; href: string }[] = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact", href: "/contact" },
];

export default function Nav() {
  const [isNavOpen, toggleNav] = useToggle();

  return (
    <nav className="mx-6 my-4 flex h-[52px] items-center gap-4 sm:gap-8 md:mx-24">
      <div className="grow">
        <Logo />
      </div>
      <div className="hidden items-center gap-8 text-lg sm:flex">
        <NavLinks />
      </div>
      <IconButton onClick={toggleNav} Icon={RiMenu5Fill} classes="sm:hidden" />
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            className="bg-main-50 absolute inset-x-0 inset-y-0 z-50 sm:hidden"
            variants={openNavVariants}
            initial="initial"
            animate="animate"
            exit="hide"
          >
            <div className="absolute right-6 top-6">
              <IconButton onClick={toggleNav} Icon={RiCloseFill} />
            </div>
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
              className="flex h-full flex-col items-center justify-center gap-8 text-2xl font-bold"
            >
              <NavLinks toggleNav={toggleNav} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Button variant="default">Sign in</Button>
    </nav>
  );
}
