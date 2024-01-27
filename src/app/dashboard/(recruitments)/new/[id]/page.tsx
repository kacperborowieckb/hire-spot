"use client";

import Link from "next/link";
import { toast } from "sonner";
import Button from "~/ui/button/Button";

export default async function LinkForRecruitmentPage({
  params,
}: {
  params: { id: string };
}) {
  const link = `localhost:3000/apply/${params.id}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(link);
    toast.success("Copied to clipboard");
  };

  return (
    <main className="mx-auto flex flex-col gap-4 p-4 text-center">
      <h1 className="font-semi-bold text-4xl text-main-600">
        Congratulations!
      </h1>
      <p className="text-text-secondary text-lg">
        You have just created a recruitment
      </p>
      <p className="text-text-secondary text-lg">
        All you have to do now is to send this link to your candidates
      </p>
      <div className="mx-auto max-w-xs sm:max-w-xl">
        <div
          className="mt-2 cursor-pointer truncate rounded-lg border border-main-500 bg-main-50 p-2 px-4 text-xl transition-shadow hover:shadow-md"
          onClick={copyLink}
        >
          {link}
        </div>
        <Link href={`/dashboard/${params.id}`} className="w-full">
          <Button variant="default" className="mt-4 w-full">
            Go to recruitment dashboard
          </Button>
        </Link>
      </div>
    </main>
  );
}
