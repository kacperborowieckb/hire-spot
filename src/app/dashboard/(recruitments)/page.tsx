import React from "react";
import AddRecruitment from "./_components/add-recruitment/AddRecruitment";
import RecruitmentCard from "./_components/recruitment-card/RecruitmentCard";
import { currentUser } from "@clerk/nextjs";
import Spinner from "~/app/ui/Spinner";

export default async function Dashboard() {
  const user = await currentUser();

  if (!user) return <Spinner className="mt-8" />;

  return (
    <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
      <AddRecruitment />
      <RecruitmentCard />
      <RecruitmentCard />
      <RecruitmentCard />
    </main>
  );
}
