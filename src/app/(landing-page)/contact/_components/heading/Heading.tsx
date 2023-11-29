import Image from "next/image";
import React from "react";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "~/app/ui/motion-components/MotionComponents";
import { fadeInAnimationVariants } from "~/app/utils/variants";

export default function Heading() {
  return (
    <MotionDiv
      data-testid="contact-heading"
      initial="initial"
      animate="animate"
      transition={{ staggerChildren: 0.15 }}
      className="my-8 flex flex-col items-center gap-4"
    >
      <MotionDiv variants={fadeInAnimationVariants}>
        <Image
          src={"/logo-without-name.svg"}
          width={48}
          height={48}
          alt="HireSpot logo"
        />
      </MotionDiv>
      <MotionH1
        variants={fadeInAnimationVariants}
        className="text-4xl font-bold sm:text-5xl"
      >
        Contact me
      </MotionH1>
      <MotionP
        variants={fadeInAnimationVariants}
        className="mx-4 mb-4 text-center text-lg"
      >
        If you have any questions, feel free to ask.
      </MotionP>
    </MotionDiv>
  );
}
