import { BsThreeDots } from "react-icons/bs";
import Card from "~/ui/card/Card";

type CandidateCardProps = {
  name: string;
  desc: string;
  applied: string;
  interviewStage?: string;
  candidateId: string;
};

export default function CandidateCard({
  name,
  desc,
  applied,
  interviewStage,
  candidateId,
}: CandidateCardProps) {
  return (
    <Card className="gap-1 !p-2">
      <section className="flex gap-2">
        <h3 className="flex-grow text-lg text-black-900">{name}</h3>
        <div className="flex -translate-y-1 transform cursor-pointer items-center justify-center transition-transform hover:scale-105">
          <BsThreeDots size={22} className="fill-black-900" />
        </div>
      </section>
      <p className="line-clamp-2 text-black-600">{desc}</p>
      <section className="mt-1 flex">
        <p className="flex-grow text-sm text-black-900">
          Applied: <span className="text-sm text-black-600">{applied}</span>
        </p>
        {interviewStage && (
          <p className="text-sm text-black-600">{interviewStage}</p>
        )}
      </section>
    </Card>
  );
}
