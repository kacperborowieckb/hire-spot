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

export const dropdownVariants: Variants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  hide: {
    transition: { duration: 0.15 },
    scale: 0.9,
    opacity: 0,
  },
  show: {
    scale: 1,
    transition: { duration: 0.15 },
    opacity: 1,
  },
};

export const bgVariants: Variants = {
  initial: {
    backgroundColor: "rgb(31 31 31 / 0)",
  },
  hide: {
    transition: { duration: 0.15 },
    backgroundColor: "rgb(31 31 31 / 0)",
  },
  show: {
    transition: { duration: 0.15 },
    backgroundColor: "rgb(31 31 31 / 0.65)",
  },
};

export const modalVariants: Variants = {
  initial: {
    translateX: "-50%",
    translateY: "-40%",
    scale: 0.9,
    opacity: 0,
  },
  hide: {
    translateY: "-40%",
    transition: { duration: 0.15, ease: "easeOut" },
    scale: 0.9,
    opacity: 0,
  },
  show: {
    translateY: "-50%",
    scale: 1,
    transition: { duration: 0.15, ease: "easeOut" },
    opacity: 1,
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
