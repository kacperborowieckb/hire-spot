"use client";

import { IconType } from "react-icons";
import IconButton from "~/app/ui/icon-button/IconButton";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "~/app/utils/variants";

type ContactCardProps = {
  title: string;
  content: string;
  icon: IconType;
  children?: React.ReactNode;
};

export default function Card({
  title,
  content,
  icon,
  children,
}: ContactCardProps) {
  return (
    <motion.div
      variants={fadeInAnimationVariants}
      initial="initial"
      animate="animate"
      whileHover={{ translateY: "-5px" }}
      className="flex aspect-square w-64 flex-col gap-2 rounded-lg border-2 border-main-400 bg-main-50 p-4 shadow-md"
    >
      <div className="flex-grow">
        <IconButton Icon={icon}></IconButton>
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p>{content}</p>
      {children}
    </motion.div>
  );
}
