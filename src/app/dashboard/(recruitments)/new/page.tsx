"use client";

import React, { TextareaHTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/app/ui/input/Input";
import Button from "~/app/ui/button/Button";
import Image from "next/image";

const newRecruitmentSchema = z.object({
  positionTitle: z
    .string()
    .min(3, "Position title must be at least 3 characters")
    .max(32, "Position title must be below 32 characters"),
  description: z
    .string()
    .max(1024, "Description must be below 1024 characters"),
});

type TNewRecruitmentSchema = z.infer<typeof newRecruitmentSchema>;

export default function NewRecruitment() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TNewRecruitmentSchema>({
    resolver: zodResolver(newRecruitmentSchema),
  });

  const onSubmit = () => {};

  return (
    <main className="mx-6 my-8 flex h-full flex-1 justify-around gap-8 md:mx-24">
      <div className="flex max-w-lg flex-grow flex-col gap-4">
        <h1 className="text-2xl font-bold">Create recruitment</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          className="flex w-full flex-1 flex-col gap-2 [&>*:nth-child(2)]:h-full"
        >
          <Input
            label="Position title"
            controllerProps={{ name: "positionTitle", control }}
            error={errors.positionTitle}
          />
          <Input
            label="Description"
            controllerProps={{ name: "description", control }}
            error={errors.description}
            as="textarea"
            inputProps={{ className: "h-full" }}
          />
          <Button variant="default" className="mt-4">
            Create
          </Button>
        </form>
      </div>
      <div className="flex items-center justify-center">
        <Image
          data-testid="new-recruitment-img"
          src={"/new-recruitment.svg"}
          className="scale-x-[-1] pl-4"
          priority={true}
          alt="Hero image represents hiring process"
          width={448}
          height={300}
        />
      </div>
    </main>
  );
}
