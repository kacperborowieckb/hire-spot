import { RefObject, useEffect } from "react";

export default function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T>,
  callback: (e: MouseEvent | TouchEvent) => void,
): void {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (e.target) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          callback(e);
        }
      }
    };

    window.addEventListener("mousedown", handleClick);

    return () => window.removeEventListener("mousedown", handleClick);
  }, []);
}
