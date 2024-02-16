"use client";

import { AnimatePresence } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { MotionDiv } from "../motion-components/MotionComponents";
import { dropdownVariants } from "~/utils/variants";
import useClickOutside from "~/hooks/useClickOutside";

type TDropDownContext = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const DropDownContext = createContext<TDropDownContext>({} as TDropDownContext);

function Dropdown({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <DropDownContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </DropDownContext.Provider>
  );
}

function DropdownTrigger({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useContext(DropDownContext);
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <button
      className="cursor-pointer hover:scale-105 disabled:pointer-events-none"
      onClick={toggleDropdown}
      disabled={isOpen}
    >
      {children}
    </button>
  );
}

function DropdownContainer({ children }: { children: React.ReactNode }) {
  // this additional component reduce amount of listeners => from all of closed dropdowns to only one open
  const { setIsOpen } = useContext(DropDownContext);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  return (
    <MotionDiv
      ref={ref}
      variants={dropdownVariants}
      initial="initial"
      animate="show"
      exit="hide"
      className="relative"
    >
      <ul className="absolute right-0 top-2 flex min-w-40 flex-col gap-1 rounded-md border border-border bg-main-50 p-[6px] shadow-md">
        {children}
      </ul>
    </MotionDiv>
  );
}

function DropdownContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropDownContext);

  return (
    <AnimatePresence>
      {isOpen && <DropdownContainer>{children}</DropdownContainer>}
    </AnimatePresence>
  );
}

function DropdownBreak() {
  return <hr className="border-border" />;
}

function DropdownItem({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useContext(DropDownContext);
  const closeDropdown = () => setIsOpen(false);

  return (
    <li
      className="flex min-w-max gap-2 rounded-md px-2 py-[2px] text-black-600 hover:bg-main-100"
      onClick={closeDropdown}
    >
      {children}
    </li>
  );
}

function DropdownItemIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto flex items-center justify-center">{children}</div>
  );
}

export {
  Dropdown,
  DropdownBreak,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
  DropdownItemIcon,
};
