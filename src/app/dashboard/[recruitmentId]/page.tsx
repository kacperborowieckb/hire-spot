import { api } from "~/trpc/server";
import InfoCard from "./_components/info-card/InfoCard";
import { Ri24HoursFill } from "react-icons/ri";
import StatisticCard from "./_components/statistic-card/StatisticCard";

const iconFill = "rgb(224 227 255)";
const iconSize = 20;

export default async function RecruitmentHome({
  params,
}: {
  params: { recruitmentId: string };
}) {
  //TODO tests
  const candidates = await api.recruitment.getRecruitmentCandidates.query({
    id: params.recruitmentId,
  });

  return (
    <section className="flex w-full flex-col gap-4 p-4 lg:gap-8 lg:p-8">
      <h1 className="block text-center text-lg font-semibold text-black-900 sm:hidden">
        Junior software developer
      </h1>
      <div className="grid h-min grid-cols-2 gap-4 accent-main-600 md:grid-cols-4 lg:gap-8">
        <InfoCard
          icon={<Ri24HoursFill fill={iconFill} size={iconSize} />}
          percentage={43}
          title="Total"
          value={163}
        />
        <InfoCard
          icon={<Ri24HoursFill fill={iconFill} size={iconSize} />}
          percentage={43}
          title="Checked"
          value={120}
        />
        <InfoCard
          icon={<Ri24HoursFill fill={iconFill} size={iconSize} />}
          percentage={43}
          title="title"
          value={21}
        />
        <InfoCard
          icon={<Ri24HoursFill fill={iconFill} size={iconSize} />}
          percentage={43}
          title="title"
          value={21}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-8">
        <StatisticCard title="Latest candidate">
          <p></p>
        </StatisticCard>
        <StatisticCard title="Closest schedule interview">
          <p></p>
        </StatisticCard>
      </div>
    </section>
  );
}
