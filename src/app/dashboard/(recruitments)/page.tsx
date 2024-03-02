import { api } from "~/trpc/server";
import AddRecruitment from "./_components/add-recruitment/AddRecruitment";
import RecruitmentCard from "./_components/recruitment-card/RecruitmentCard";
import dayjs from "dayjs";

export default async function Dashboard() {
  const recruitmentsData = await api.recruitment.getAllRecruitmentData.query();

  return (
    <main className="mx-6 my-4 flex flex-wrap justify-center gap-4 sm:justify-start md:mx-24">
      <AddRecruitment />
      {recruitmentsData.map((recruitment) => (
        <RecruitmentCard
          key={recruitment.id}
          position={recruitment.position}
          allCandidates={recruitment.candidates}
          startedAt={dayjs(recruitment.createdAt).format("DD-MM-YYYY")}
          uncheckedCandidates={recruitment.uncheckedCandidates}
          recruitmentId={recruitment.id}
        />
      ))}
    </main>
  );
}
