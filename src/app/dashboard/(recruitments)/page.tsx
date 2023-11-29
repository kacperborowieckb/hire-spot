import AddRecruitment from "./_components/add-recruitment/AddRecruitment";
import RecruitmentCard from "./_components/recruitment-card/RecruitmentCard";

export default async function Dashboard() {
  return (
    <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
      <AddRecruitment />
      <RecruitmentCard />
      <RecruitmentCard />
      <RecruitmentCard />
    </main>
  );
}
