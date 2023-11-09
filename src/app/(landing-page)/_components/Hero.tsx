import Image from "next/image";
import React from "react";
import Button from "~/app/ui/Button";

export default function Hero() {
  return (
    <div className="m-8 mt-32 flex justify-center gap-16">
      <div className="flex max-w-md flex-col">
        <h1 className="mb-4 text-5xl font-bold">
          Revolutionize Your{" "}
          <span className="text-main-600">Hiring Process</span> Effortlessly!
          <Image
            src={"/underline.svg"}
            alt=""
            width={260}
            height={30}
            className="translate-x-2 transform"
          />
        </h1>
        <p className="mb-4 text-lg">
          Discover a Smarter Way to Recruit, Streamline Your Hiring, and Build
          Your Dream Team.
        </p>
        <div className="flex gap-4">
          <Button variant="default">Try it out!</Button>
          <Button variant="outline">Try it out!</Button>
        </div>
      </div>
      <div>
        <Image
          src={"/hero.svg"}
          priority={true}
          alt="Hero image represents hiring process"
          width={450}
          height={300}
        ></Image>
      </div>
    </div>
  );
}
