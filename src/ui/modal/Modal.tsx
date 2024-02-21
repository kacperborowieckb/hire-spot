import React, { useRef } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import { cn } from "~/utils/cn";

type ModalProps = React.HTMLAttributes<HTMLDivElement> & {
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
    <div className="absolute left-0 top-0 z-50 h-full w-full overflow-hidden bg-black-900 bg-opacity-75">
      <div
        ref={modal}
        className={cn(
          "absolute left-1/2 top-1/2 max-h-[calc(100%-32px)] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg border border-border bg-main-50 p-4 shadow-md",
          className,
        )}
        {...otherProps}
      >
        {children}
      </div>
    </div>
  );
}
