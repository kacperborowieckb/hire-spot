import { api } from "~/trpc/server";
import InfoCard from "./_components/info-card/InfoCard";
import {
  RiCalendar2Fill,
  RiCheckboxCircleFill,
  RiClipboardFill,
  RiUserFollowFill,
} from "react-icons/ri";
import StatisticCard from "./_components/statistic-card/StatisticCard";
import { countCandidates } from "~/helpers/countCandidates";
import { calculatePercentage } from "~/helpers/calculatePercentage";

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

  const length = candidates.length;
  const uncheckedCandidates = countCandidates(candidates, "UNCHECKED");
  const scheduledCandidates = countCandidates(candidates, "SCHEDULED");
  const acceptedCandidates = countCandidates(candidates, "COMPLETED");

  return (
    <section className="flex w-full flex-col gap-4 p-4 lg:gap-8 lg:p-8">
      <h1 className="block text-center text-lg font-semibold text-black-900 sm:hidden">
        Junior software developer
      </h1>
      {length ? (
        <>
          <div className="grid h-min grid-cols-2 gap-4 accent-main-600 md:grid-cols-4 lg:gap-8">
            <InfoCard
              icon={<RiClipboardFill fill={iconFill} size={iconSize} />}
              title="Total"
              value={length}
            />
            <InfoCard
              icon={<RiCheckboxCircleFill fill={iconFill} size={iconSize} />}
              percentage={calculatePercentage(length, uncheckedCandidates)}
              title="Checked"
              value={uncheckedCandidates}
            />
            <InfoCard
              icon={<RiCalendar2Fill fill={iconFill} size={iconSize} />}
              percentage={calculatePercentage(length, scheduledCandidates)}
              title="title"
              value={scheduledCandidates}
            />
            <InfoCard
              icon={<RiUserFollowFill fill={iconFill} size={iconSize} />}
              percentage={calculatePercentage(length, acceptedCandidates)}
              title="title"
              value={acceptedCandidates}
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
            <StatisticCard title="Latest candidate">
              {/* TODO add tests when content added */}
              <p></p>
            </StatisticCard>
            <StatisticCard title="Closest schedule interview">
              <p></p>
            </StatisticCard>
          </div>
        </>
      ) : (
        <div>No candidates</div>
      )}
    </section>
  );
}
