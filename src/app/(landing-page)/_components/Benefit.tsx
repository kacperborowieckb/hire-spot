"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "~/app/utils/variants";

type BenefitProps = {
  title: string;
  content: string;
  src: string;
  alt: string;
  reverse?: boolean;
};

export default function Benefit({
  title,
  content,
  src,
  alt,
  reverse,
}: BenefitProps) {
  return (
    <div
      data-testid="benefit"
      className={`m-8 mb-16 mt-0 flex flex-col items-center justify-center gap-16 text-center lg:text-left ${
        reverse ? "lg:flex-row-reverse" : "lg:flex-row"
      }`}
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="flex max-w-md flex-col justify-center gap-4"
      >
        <motion.h2
          variants={fadeInAnimationVariants}
          className="text-main-600 text-3xl font-bold sm:text-4xl"
        >
          {title}
        </motion.h2>
        <motion.p
          variants={fadeInAnimationVariants}
          className=" text-main-950 text-base sm:text-lg"
        >
          {content}
        </motion.p>
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Image src={src} width={448} height={300} alt={alt} />
      </motion.div>
    </div>
  );
}
