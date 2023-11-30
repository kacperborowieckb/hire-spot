"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/ui/input/Input";
import Button from "~/ui/button/Button";
import Image from "next/image";
import { api } from "~/trpc/react";
import {
  TNewRecruitmentSchema,
  newRecruitmentSchema,
} from "~/schemas/newRecruitment";

export default function NewRecruitment() {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<TNewRecruitmentSchema>({
    resolver: zodResolver(newRecruitmentSchema),
    defaultValues: {
      description: "",
      positionTitle: "",
    },
  });

  const { mutate: addRecruitment } =
    api.recruitment.addRecruitment.useMutation();

  const onSubmit = ({ description, positionTitle }: TNewRecruitmentSchema) => {
    const recruitmentId = addRecruitment({ description, positionTitle });
    console.log(recruitmentId);
  };

  return (
    <main className="mx-6 my-8 flex h-full flex-1 justify-around gap-8 lg:mx-24">
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
      <div className="hidden items-center justify-center lg:flex">
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
