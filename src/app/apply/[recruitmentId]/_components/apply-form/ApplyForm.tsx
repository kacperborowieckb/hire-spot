"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { TApplySchema, applySchema } from "~/schemas/applySchema";
import { api } from "~/trpc/react";
import Button from "~/ui/button/Button";
import FileInput from "~/ui/file-input/FileInput";
import Input from "~/ui/input/Input";
import { useUploadThing } from "~/utils/uploadthing";

export default function ApplyForm() {
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<TApplySchema>({
    resolver: zodResolver(applySchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
      cv: "",
    },
  });

  const params = useParams<{ recruitmentId: string }>();

  const { startUpload } = useUploadThing("imageUploader");
  const { mutate: addCandidate } = api.candidate.addCandidate.useMutation({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = async ({ email, name, cv, description }: TApplySchema) => {
    const userId = await startUpload([cv]);
    if (userId && userId[0]) {
      addCandidate({
        email,
        name,
        description,
        cvUrl: userId[0]?.url,
        recruitmentId: params.recruitmentId,
      });
    }
  };

  return (
    <form
      aria-label="form"
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 flex w-full flex-col gap-2"
    >
      <Input
        label="Name"
        controllerProps={{ name: "name", control }}
        error={errors.name}
      />
      <Input
        label="Email"
        controllerProps={{ name: "email", control }}
        error={errors.email}
      />
      <Input
        label="Let us know something about you"
        as="textarea"
        controllerProps={{ name: "description", control }}
        error={errors.description}
      />

      <FileInput
        label="CV"
        controllerProps={{ name: "cv", control }}
        errorMessage={errors.cv?.message?.toString()}
      />
      <Button variant="default" className="ml-auto">
        Apply
      </Button>
    </form>
  );
}
