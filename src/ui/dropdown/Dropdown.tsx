"use client";

import { AnimatePresence } from "framer-motion";
import React, {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
  useRef,
  useState,
} from "react";
import { MotionDiv } from "../motion-components/MotionComponents";
import { dropdownVariants } from "~/utils/variants";
import useClickOutside from "~/hooks/useClickOutside";

//TODO make it accesible

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
  const toggleDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <button
      className="cursor-pointer hover:scale-105 disabled:pointer-events-none"
      onClick={(e) => toggleDropdown(e)}
      disabled={isOpen}
      aria-haspopup="true"
      aria-expanded={isOpen}
    >
      {children}
    </button>
  );
}

function DropdownContainer({ children }: { children: React.ReactNode }) {
  // this additional component reduce amount of listeners => from all of closed dropdowns to only one open
  const { setIsOpen } = useContext(DropDownContext);
  const ref = useRef<HTMLUListElement>(null);

  useClickOutside(ref, () => setIsOpen(false));

  const closeDropdown = (e: React.FocusEvent<HTMLUListElement, Element>) => {
    if (!ref.current?.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  return (
    <MotionDiv
      variants={dropdownVariants}
      initial="initial"
      animate="show"
      exit="hide"
      className="relative"
    >
      <ul
        ref={ref}
        onClick={(e) => e.stopPropagation()}
        onBlur={(e) => closeDropdown(e)}
        className="absolute right-0 top-2 flex min-w-40 flex-col gap-1 rounded-md border border-border bg-main-50 p-[6px] shadow-md"
        aria-labelledby="dropdown-trigger"
      >
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

type DropdownItemProps = React.HTMLAttributes<HTMLLIElement> & {
  children: React.ReactNode;
};

function DropdownItem({ children, onClick, ...otherProps }: DropdownItemProps) {
  const { setIsOpen } = useContext(DropDownContext);
  const closeDropdown = () => setIsOpen(false);

  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    if (onClick) onClick(e);
    closeDropdown();
  };

  return (
    <li
      className="flex min-w-max gap-2 rounded-md px-2 py-[2px] text-black-600 hover:bg-main-100 focus:bg-main-100"
      onClick={(e) => handleClick(e)}
      role="menuitem"
      tabIndex={0}
      {...otherProps}
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
