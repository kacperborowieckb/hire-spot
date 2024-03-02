import { useEffect, useState } from "react";

type TUseWindowSizeState = { height?: number; width?: number };

const IS_SERVER = typeof window === "undefined";

const initialState = IS_SERVER
  ? {
      height: undefined,
      width: undefined,
    }
  : {
      width: window.innerWidth,
      height: window.innerHeight,
    };

export function useWindowSize(): TUseWindowSizeState {
  const [size, setSize] = useState<TUseWindowSizeState>(initialState);

  const handleResize = () => {
    setSize({ height: window.innerHeight, width: window.innerWidth });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { height: size.height, width: size.width };
}
