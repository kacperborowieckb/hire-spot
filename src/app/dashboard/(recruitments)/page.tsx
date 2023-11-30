import { api } from "~/trpc/server";
import AddRecruitment from "./_components/add-recruitment/AddRecruitment";
import RecruitmentCard from "./_components/recruitment-card/RecruitmentCard";

export default async function Dashboard() {
  const data = await api.recruitment.getAllRecruitment.query();

  return (
    <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
      <AddRecruitment />
      {data.map((recruitment) => (
        <RecruitmentCard key={recruitment.id} />
      ))}
    </main>
  );
}
