"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import { z } from "zod";
import Input from "~/ui/input/Input";

const searchCandidateSchema = z.object({
  candidateName: z.string(),
});

export type TSearchCandidateSchema = z.infer<typeof searchCandidateSchema>;

export default function SearchCandidate() {
  const {
    formState: { errors },
    control,
  } = useForm<TSearchCandidateSchema>({
    resolver: zodResolver(searchCandidateSchema),
    defaultValues: { candidateName: "" },
  });
  // TODO tests
  return (
    <div>
      <Input
        inputProps={{ placeholder: "Search for candidate" }}
        controllerProps={{ name: "candidateName", control }}
        label=""
        Icon={RiSearch2Line}
      />
    </div>
  );
}
