import Link from "next/link";

type RecruitmentCardProps = {
  position: string;
  allCandidates: number;
  startedAt: string;
  uncheckedCandidates: number;
  recruitmentId: string;
};

export default function RecruitmentCard({
  allCandidates,
  position,
  startedAt,
  uncheckedCandidates,
  recruitmentId,
}: RecruitmentCardProps) {
  return (
    <Link
      href={`/dashboard/${recruitmentId}`}
      className="border-border flex h-64 w-56 flex-col gap-4 rounded-lg border bg-main-50 p-4 text-center shadow-md transition-transform hover:scale-[1.02]"
      data-testid="recruitment-card"
    >
      <h3 className="my-2 truncate font-semibold">{position}</h3>
      <hr />
      <p>
        <span className="font-bold text-main-600">{allCandidates}</span>{" "}
        candidates
      </p>
      <p>Started at: {startedAt}</p>
      <p>
        <span className="font-bold text-main-600">{uncheckedCandidates}</span>{" "}
        candidates to check
      </p>
    </Link>
  );
}
