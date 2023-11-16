"use client";

import Button from "~/app/ui/button/Button";
import Logo from "~/app/ui/logo/Logo";
import { RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import { useToggle } from "~/app/hooks/useToggle";
import { motion, AnimatePresence } from "framer-motion";
import { openNavVariants } from "~/app/utils/variants";
import NavLinks from "../nav-links/NavLinks";
import IconButton from "~/app/ui/icon-button/IconButton";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";

export default function Nav() {
  const [isNavOpen, toggleNav] = useToggle(false);

  const { isSignedIn } = useUser();

  return (
    <nav className="mx-6 my-4 flex h-[52px] items-center gap-4 sm:gap-8 md:mx-24">
      <div className="grow">
        <Logo />
      </div>
      <div
        data-testid="nav-links-container"
        className="hidden items-center gap-8 text-lg sm:flex"
      >
        <NavLinks />
      </div>
      <IconButton
        data-testid="open-nav-button"
        onClick={toggleNav}
        Icon={RiMenu5Fill}
        classes="sm:hidden"
      />
      <AnimatePresence>
        {isNavOpen && (
          <motion.div
            data-testid="mobile-nav"
            className="bg-main-50 absolute inset-x-0 inset-y-0 z-50 sm:hidden"
            variants={openNavVariants}
            initial="initial"
            animate="animate"
            exit="hide"
          >
            <div className="absolute right-6 top-6">
              <IconButton
                data-testid="close-nav-button"
                onClick={toggleNav}
                Icon={RiCloseFill}
              />
            </div>
            <motion.div
              data-testid="nav-links-container"
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
      {isSignedIn ? (
        <UserButton
          data-testid="user-button"
          afterSignOutUrl="/"
          appearance={{
            elements: { avatarBox: "w-[38px] h-[38px]" },
          }}
        />
      ) : (
        <Link href={"/sign-in"}>
          <Button variant="default">Sign in</Button>
        </Link>
      )}
    </nav>
  );
}
