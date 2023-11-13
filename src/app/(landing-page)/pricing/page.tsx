"use client";

import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "~/app/utils/variants";
import Button from "~/app/ui/button/Button";
import Link from "next/link";

export default function Pricing() {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.15 }}
      className="mx-4 my-8 flex flex-col items-center gap-4 text-center"
    >
      <motion.h1
        variants={fadeInAnimationVariants}
        className="flex gap-3 text-5xl font-bold"
      >
        It&apos;s
        <span className="relative mb-4 flex flex-col">
          Free!
          <Image
            src={"/underline.svg"}
            alt=""
            width={140}
            height={30}
            className="absolute left-1/2 top-full w-[100%] max-w-[140px]  -translate-x-1/2 transform lg:left-0 lg:translate-x-0"
          />
        </span>
      </motion.h1>
      <motion.p
        variants={fadeInAnimationVariants}
        className="mb-2 max-w-lg text-xl"
      >
        Enjoy the full functionality of the app without any cost, it might
        change after some time.
      </motion.p>
      <Link href={"/"}>
        <Button variant="default">Try it out</Button>
      </Link>
    </motion.main>
  );
}
