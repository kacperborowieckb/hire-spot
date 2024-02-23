"use client";

import React from "react";
import { api } from "~/trpc/react";
import NoCandidateFound from "../../check/_components/no-candidate-found/NoCandidateFound";
import PDFView from "../../check/_components/pdf-view/PDFView";
import Button from "~/ui/button/Button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "~/ui/input/Input";
import { RiArrowLeftLine } from "react-icons/ri";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const InterviewSummarySchema = z.object({
  summary: z.string(),
});

type TInterviewSummarySchema = z.infer<typeof InterviewSummarySchema>;

export default function CandidateInterview({
  params: { candidateId, recruitmentId },
}: {
  params: { candidateId: string; recruitmentId: string };
}) {
  const router = useRouter();
  const { data: candidate } = api.candidate.getCandidateById.useQuery({
    candidateId,
  });
  const { mutate: completeInterview } =
    api.candidate.completeInterview.useMutation({
      onSuccess: () => {
        toast.success("Interview completed");
        reset();
        router.replace(`/dashboard/${recruitmentId}/interview`);
      },
    });
  const {
    formState: { errors },
    control,
    reset,
    handleSubmit,
  } = useForm<TInterviewSummarySchema>({
    resolver: zodResolver(InterviewSummarySchema),
    defaultValues: { summary: "" },
  });

  const onSubmit = ({ summary }: TInterviewSummarySchema) =>
    completeInterview({ candidateId, summary });

  if (!candidate || !candidate.forInterview)
    return (
      <section className="flex w-full flex-col gap-8 p-4 lg:flex-row lg:p-8">
        <NoCandidateFound />
      </section>
    );

  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-6 p-4 sm:mb-0 lg:flex-row lg:items-start lg:p-8">
      <div className="flex w-full max-w-[622px] flex-col gap-2 lg:max-w-[350px]">
        <h2 className="text-lg font-semibold text-black-900">
          {candidate.name}
        </h2>
        <p className="text-black-600">{candidate.description}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            controllerProps={{ name: "summary", control }}
            label="Interview Summary"
            as="textarea"
            error={errors.summary}
            inputProps={{ className: "bg-main-50 min-h-[250px]" }}
          />
          <div className="flex justify-between">
            <Button className="flex w-max items-center gap-2" variant="outline">
              <RiArrowLeftLine />
              Go back
            </Button>
            <Button variant="default">Mark as completed</Button>
          </div>
        </form>
      </div>
      <PDFView pdf={candidate.cvUrl} />
    </section>
  );
}
