import React from "react";
import Logo from "../ui/logo/Logo";
import { UserButton } from "@clerk/nextjs";
import AddRecruitment from "./_components/add-recruitment/AddRecruitment";

export default function Dashboard() {
  return (
    <>
      <nav className="mx-6 my-4 flex items-center justify-between md:mx-24">
        <Logo />
        <UserButton />
      </nav>
      <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
        <AddRecruitment />
      </main>
    </>
  );
}
