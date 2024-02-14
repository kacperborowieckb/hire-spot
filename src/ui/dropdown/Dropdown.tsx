"use client";

import { AnimatePresence } from "framer-motion";
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

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
    <div className="cursor-pointer hover:scale-105" onClick={toggleDropdown}>
      {children}
    </div>
  );
}

function DropdownContent({ children }: { children: React.ReactNode }) {
  const { isOpen } = useContext(DropDownContext);

  return (
    isOpen && (
      <div className="relative">
        <ul className="absolute right-0 top-2 flex w-16 min-w-[148px] flex-col gap-1 rounded-md border border-border bg-main-50 p-[6px] shadow-md">
          {children}
        </ul>
      </div>
    )
  );
}

function DropdownBreak() {
  return <hr className="border-border" />;
}

function DropdownItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2 rounded-md px-2 py-[2px] text-black-600 hover:bg-main-100">
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
