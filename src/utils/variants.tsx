import type { Variants } from "framer-motion";

export const openNavVariants: Variants = {
  initial: {
    y: "-100%",
    clipPath: "circle(0%)",
  },
  hide: {
    y: "-100%",
    transition: { duration: 0.5 },
    clipPath: "circle(0%)",
  },
  animate: {
    y: 0,
    transition: { duration: 0.5 },
    clipPath: "circle(100%)",
  },
};

export const fadeInAnimationVariants: Variants = {
  initial: {
    opacity: 0,
    y: 25,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const extendContentVariants: Variants = {
  initial: {
    height: 0,
    opacity: 0,
  },
  animate: {
    height: "auto",
    opacity: 1,
  },
  exit: {
    height: 0,
    opacity: 0,
  },
};
