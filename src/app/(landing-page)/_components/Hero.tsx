import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "~/app/ui/Button";

export default function Hero() {
  return (
    <div className="m-4 mt-16 flex flex-col items-center justify-center gap-8 sm:m-8 sm:mt-24 md:mt-32 lg:flex-row lg:gap-16">
      <div className="flex max-w-full flex-col text-center lg:max-w-md lg:text-left">
        <h1 className="mb-4 text-4xl font-bold sm:text-5xl">
          Revolutionize Your{" "}
          <span className="text-main-600">Hiring Process</span>
          <span className="relative mb-4 flex flex-col">
            Effortlessly!
            <Image
              src={"/underline.svg"}
              alt=""
              width={260}
              height={30}
              className="absolute left-1/2 top-full -translate-x-1/2 transform lg:left-0 lg:translate-x-0"
            />
          </span>
        </h1>
        <p className="mb-4 text-lg">
          Discover a Smarter Way to Recruit, Streamline Your Hiring, and Build
          Your Dream Team.
        </p>
        <div className="flex justify-center gap-4 lg:justify-normal">
          <Link href={"/"}>
            <Button variant="default">Try it out!</Button>
          </Link>
          <Link href={"/"}>
            <Button variant="outline">See more</Button>
          </Link>
        </div>
      </div>
      <div>
        <Image
          src={"/hero.svg"}
          priority={true}
          alt="Hero image represents hiring process"
          width={448}
          height={300}
        />
      </div>
    </div>
  );
}
