import Image from "next/image";
import React from "react";
import { fadeInAnimationVariants } from "~/utils/variants";
import Button from "~/ui/button/Button";
import {
  MotionH1,
  MotionLink,
  MotionMain,
  MotionP,
} from "~/ui/motion-components/MotionComponents";

export default function Pricing() {
  return (
    <MotionMain
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.15 }}
      className="mx-4 my-8 flex flex-col items-center gap-4 text-center"
    >
      <MotionH1
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
      </MotionH1>
      <MotionP
        variants={fadeInAnimationVariants}
        className="mb-2 max-w-lg text-xl"
      >
        Enjoy the full functionality of the app without any cost, it might
        change after some time.
      </MotionP>
      <MotionLink href={"/"} variants={fadeInAnimationVariants}>
        <Button variant="default">Try it out</Button>
      </MotionLink>
    </MotionMain>
  );
}
