import { api } from "~/trpc/server";
import InfoCard from "./_components/info-card/InfoCard";
import {
  RiCalendar2Fill,
  RiCheckboxCircleFill,
  RiClipboardFill,
  RiUserFollowFill,
} from "react-icons/ri";
import StatisticCard from "./_components/statistic-card/StatisticCard";
import { countCandidatesByRating } from "~/helpers/countCandidatesByRating";
import { calculatePercentage } from "~/helpers/calculatePercentage";
import { countCandidatesByInterviewStage } from "~/helpers/countCandidateByInterviewStage";
import CandidateCard from "./checked/_components/candidate-card/CandidateCard";
import { findClosestInterview } from "~/helpers/findClosestInterview";

const iconFill = "rgb(224 227 255)";
const iconSize = 20;

export default async function RecruitmentHome({
  params,
}: {
  params: { recruitmentId: string };
}) {
  //TODO tests
  const candidates = await api.candidate.getCandidatesByRecruitmentId.query({
    recruitmentId: params.recruitmentId,
  });
  const recruitment = await api.recruitment.getRecruitmentById.query({
    id: params.recruitmentId,
  });

  const length = candidates.length;
  const checkedCandidates = countCandidatesByRating(candidates, [
    "STRONG_YES",
    "YES",
    "NO",
  ]);
  const scheduledCandidates = countCandidatesByInterviewStage(
    candidates,
    "SCHEDULED",
  );
  const acceptedCandidates = countCandidatesByInterviewStage(
    candidates,
    "COMPLETED",
  );

  const randomCandidate = candidates[Math.floor(Math.random() * length)];

  const closestInterviewCandidate = findClosestInterview(candidates);

  await new Promise((res) => setTimeout(res, 2000));

  return (
    <section className="mb-14 flex w-full flex-col gap-4 p-4 lg:gap-8 lg:p-8">
      <h1 className="block text-center text-lg font-semibold text-black-900 sm:hidden">
        {recruitment.position}
      </h1>
      <div className="grid h-min grid-cols-2 gap-4 accent-main-600 md:grid-cols-4 lg:gap-8">
        <InfoCard
          icon={<RiClipboardFill fill={iconFill} size={iconSize} />}
          title="Total"
          value={length}
        />
        <InfoCard
          icon={<RiCheckboxCircleFill fill={iconFill} size={iconSize} />}
          percentage={calculatePercentage(checkedCandidates, length)}
          title="Checked"
          value={checkedCandidates}
        />
        <InfoCard
          icon={<RiCalendar2Fill fill={iconFill} size={iconSize} />}
          percentage={calculatePercentage(scheduledCandidates, length)}
          title="Scheduled"
          value={scheduledCandidates}
        />
        <InfoCard
          icon={<RiUserFollowFill fill={iconFill} size={iconSize} />}
          percentage={calculatePercentage(acceptedCandidates, length)}
          title="Completed"
          value={acceptedCandidates}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
        <StatisticCard title="Random candidate">
          {/* TODO add tests when content added */}
          {randomCandidate ? (
            <div className="mt-2">
              <CandidateCard candidate={randomCandidate} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-black-600">No candidates.</p>
            </div>
          )}
        </StatisticCard>
        <StatisticCard title="Closest interview candidate">
          {closestInterviewCandidate ? (
            <div className="mt-2">
              <CandidateCard candidate={closestInterviewCandidate} />
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-black-600">No candidates for interview.</p>
            </div>
          )}
        </StatisticCard>
      </div>
    </section>
  );
}
