"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/app/ui/Button";
import { motion } from "framer-motion";
import { fadeInAnimationVariants } from "~/app/utils/variants";

export default function Hero() {
  return (
    <div className="mx-4 flex h-[calc(100dvh-52px-32px)] flex-col items-center justify-center gap-8  lg:flex-row lg:gap-16">
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.15 }}
        className="flex max-w-full flex-col text-center lg:max-w-md lg:text-left"
      >
        <motion.h1
          className="mb-4 mt-8 text-4xl font-bold sm:mt-0 sm:text-5xl"
          variants={fadeInAnimationVariants}
        >
          Revolutionize Your{" "}
          <span className="text-main-600">Hiring Process</span>
          <span className="relative mb-4 flex flex-col">
            Effortlessly!
            <Image
              src={"/underline.svg"}
              alt=""
              width={260}
              height={30}
              className="absolute left-1/2 top-full w-auto  max-w-[260px] -translate-x-1/2 transform lg:left-0 lg:translate-x-0"
            />
          </span>
        </motion.h1>
        <motion.p className="mb-4 text-lg" variants={fadeInAnimationVariants}>
          Discover a Smarter Way to Recruit, Streamline Your Hiring, and Build
          Your Dream Team.
        </motion.p>
        <motion.div
          className="flex justify-center gap-4 lg:justify-normal"
          variants={fadeInAnimationVariants}
        >
          <Link href={"/"}>
            <Button variant="default">Try it out!</Button>
          </Link>
          <Link href={"/#benefits"}>
            <Button variant="outline">See more</Button>
          </Link>
        </motion.div>
      </motion.div>
      <motion.div
        variants={fadeInAnimationVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          src={"/hero.svg"}
          className="pl-4"
          priority={true}
          alt="Hero image represents hiring process"
          width={448}
          height={300}
        />
      </motion.div>
    </div>
  );
}
