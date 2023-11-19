"use client";

import React from "react";
import Heading from "./_components/heading/Heading";
import Card from "./_components/card/Card";
import { RiLinkedinFill, RiMailFill, RiSaveFill } from "react-icons/ri";
import Link from "next/link";
import IconButton from "~/app/ui/icon-button/IconButton";
import { toast } from "sonner";

export default function Contact() {
  const copyMail = async () => {
    await navigator.clipboard.writeText("kacperborowiec.kb@gmail.com");
    toast.success("Copied to clipboard");
  };

  return (
    <main>
      <Heading />
      <div className="mb-4 flex flex-col items-center justify-center gap-8 sm:flex-row">
        <Card
          title="Linkedin"
          content="For any interested recruiter."
          icon={RiLinkedinFill}
        >
          <Link href={"/"} className="text-main-600 hover:underline">
            www.linkedin.com/user
          </Link>
        </Card>
        <Card title="Mail" content="For anything." icon={RiMailFill}>
          <div className="flex items-center gap-2">
            <p className="truncate text-main-600">
              kacperborowiec.kb@gmail.com
            </p>
            <IconButton Icon={RiSaveFill} onClick={copyMail} size={14} />
          </div>
        </Card>
      </div>
    </main>
  );
}
