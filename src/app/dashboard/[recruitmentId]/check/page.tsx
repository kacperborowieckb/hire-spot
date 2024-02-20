import Button from "~/ui/button/Button";
import PDFView from "./_components/pdf-view/PDFView";
import { api } from "~/trpc/server";

export default async function CheckPage({
  params,
}: {
  params: { recruitmentId: string };
}) {
  const candidates = await api.candidate.getCandidatesByRecruitmentId.query({
    recruitmentId: params.recruitmentId,
  });

  return (
    <section className="flex w-full flex-col gap-8 p-4 lg:flex-row lg:p-8">
      <div className="flex flex-col gap-4">
        <PDFView pdf="/test-cv.pdf" />
        <div className="flex justify-center gap-10">
          <Button variant="error">No</Button>
          <Button variant="outline">Yes</Button>
          <Button variant="default">Strong yes</Button>
        </div>
      </div>
      <div className="flex flex-col items-center gap-2 lg:items-start">
        <h2 className="text-2xl text-black-900">Homer Simpson</h2>
        <p className="text-base text-black-600">
          Software engineer with a lot of experience that are passionate about
          cats
        </p>
        <Button variant="outline" className="mb-16 w-fit">
          Skip this resume
        </Button>
      </div>
    </section>
  );
}
