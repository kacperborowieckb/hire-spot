import { api } from "~/trpc/server";
import Description from "./_components/description/Description";
import { notFound } from "next/navigation";
import ApplyForm from "./_components/apply-form/ApplyForm";

export default async function Apply({
  params,
}: {
  params: { recruitmentId: string };
}) {
  const { creator, position, description } =
    await api.recruitment.getRecruitmentById.query({
      id: params.recruitmentId,
    });

  if (!creator) notFound();

  return (
    <main className="mx-auto w-[512px] max-w-full px-4 py-6">
      <h1 className="min-w-full text-center text-2xl md:text-left">
        You are applying for {position}
      </h1>
      <p className="mt-2 text-right">
        Recruitment made by <span className="text-main-600">{creator}</span>
      </p>
      <Description desc={description} />
      <ApplyForm />
    </main>
  );
}
