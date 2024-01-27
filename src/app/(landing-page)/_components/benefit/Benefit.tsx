import Image from "next/image";
import React from "react";
import { fadeInAnimationVariants } from "~/utils/variants";
import {
  MotionDiv,
  MotionH2,
  MotionP,
} from "~/ui/motion-components/MotionComponents";

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
      <MotionDiv
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        transition={{ staggerChildren: 0.15 }}
        className="flex max-w-md flex-col justify-center gap-4"
      >
        <MotionH2
          variants={fadeInAnimationVariants}
          className="text-3xl font-bold text-main-600 sm:text-4xl"
        >
          {title}
        </MotionH2>
        <MotionP
          variants={fadeInAnimationVariants}
          className=" text-text-secondary text-base sm:text-lg"
        >
          {content}
        </MotionP>
      </MotionDiv>
      <MotionDiv
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <Image src={src} width={448} height={300} alt={alt} className="p-2" />
      </MotionDiv>
    </div>
  );
}
