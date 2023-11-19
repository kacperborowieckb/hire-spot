"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "~/app/utils/variants";

export default function Heading() {
  return (
    <motion.div
      data-testid="contact-heading"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.15 }}
      className="my-8 flex flex-col items-center gap-4"
    >
      <motion.div variants={fadeInAnimationVariants}>
        <Image
          src={"/logo-without-name.svg"}
          width={48}
          height={48}
          alt="HireSpot logo"
        />
      </motion.div>
      <motion.h1
        variants={fadeInAnimationVariants}
        className="text-4xl font-bold sm:text-5xl"
      >
        Contact me
      </motion.h1>
      <motion.p
        variants={fadeInAnimationVariants}
        className="mx-4 mb-4 text-center text-lg"
      >
        If you have any questions, feel free to ask.
      </motion.p>
    </motion.div>
  );
}
