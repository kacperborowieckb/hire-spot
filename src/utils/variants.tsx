export const openNavVariants = {
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

export const fadeInAnimationVariants = {
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
