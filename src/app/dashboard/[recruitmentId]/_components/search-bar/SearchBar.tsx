"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { RiSearch2Line } from "react-icons/ri";
import { z } from "zod";
import Input from "~/ui/input/Input";

const searchSchema = z.object({
  search: z.string(),
});

export type TSearchSchema = z.infer<typeof searchSchema>;

export default function SearchBar() {
  const {
    formState: { errors },
    control,
  } = useForm<TSearchSchema>({
    resolver: zodResolver(searchSchema),
    defaultValues: { search: "" },
  });
  // TODO tests
  return (
    <div>
      <Input
        inputProps={{ placeholder: "Search" }}
        controllerProps={{ name: "search", control }}
        label=""
        Icon={RiSearch2Line}
      />
    </div>
  );
}
