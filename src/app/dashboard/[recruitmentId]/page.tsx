import { api } from "~/trpc/server";
import InfoCard from "./_components/info-card/InfoCard";
import { Ri24HoursFill } from "react-icons/ri";

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
    <>
      {/* <InfoCard
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
      /> */}
    </>
  );
}
