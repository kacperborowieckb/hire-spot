"use client";

import Button from "~/ui/button/Button";
import Logo from "~/ui/logo/Logo";
import { RiMenu5Fill, RiCloseFill } from "react-icons/ri";
import { useToggle } from "~/hooks/useToggle";
import { AnimatePresence } from "framer-motion";
import { openNavVariants } from "~/utils/variants";
import NavLinks from "../nav-links/NavLinks";
import IconButton from "~/ui/icon-button/IconButton";
import Link from "next/link";
import { useUser, UserButton } from "@clerk/nextjs";
import Spinner from "~/ui/Spinner";
import { MotionDiv } from "~/ui/motion-components/MotionComponents";

export default function Nav() {
  const [isNavOpen, toggleNav] = useToggle(false);

  const { isSignedIn, isLoaded } = useUser();

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
          <MotionDiv
            data-testid="mobile-nav"
            className="absolute inset-x-0 top-0 z-50 h-screen bg-main-50 sm:hidden"
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
            <MotionDiv
              data-testid="nav-links-container"
              initial="initial"
              animate="animate"
              transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
              className="flex h-screen flex-col items-center justify-center gap-8 text-2xl font-bold"
            >
              <NavLinks toggleNav={toggleNav} />
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
      {!isLoaded ? (
        <Spinner className="w-[38px]" />
      ) : isSignedIn ? (
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
