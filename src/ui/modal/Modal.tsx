"use client";

import React, { useRef } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { cn } from "~/utils/cn";
import { MotionDiv } from "../motion-components/MotionComponents";
import { bgVariants, modalVariants } from "~/utils/variants";
import { type MotionProps } from "framer-motion";

type ModalProps = React.HTMLAttributes<HTMLDivElement> &
  MotionProps & {
    children: React.ReactNode;
    closeModal: () => void;
  };

export default function Modal({
  children,
  className,
  closeModal,
  ...otherProps
}: ModalProps) {
  const modal = useRef<HTMLDivElement>(null);
  useClickOutside(modal, closeModal);

  return (
    <MotionDiv
      variants={bgVariants}
      initial="initial"
      animate="show"
      exit="hide"
      className="fixed left-0 top-0 z-50 h-full w-full overflow-hidden"
    >
      <MotionDiv
        variants={modalVariants}
        initial="initial"
        animate="show"
        exit="hide"
        ref={modal}
        className={cn(
          "fixed left-1/2 top-1/2 max-h-[calc(100%-32px)] overflow-auto rounded-lg border border-border bg-main-50 p-4 shadow-md",
          className,
        )}
        {...otherProps}
      >
        {children}
      </MotionDiv>
    </MotionDiv>
  );
}
