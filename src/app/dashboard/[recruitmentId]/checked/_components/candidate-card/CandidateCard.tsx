import { Candidate } from "@prisma/client";
import { BsThreeDots } from "react-icons/bs";
import {
  RiArticleLine,
  RiCalendar2Line,
  RiCloseCircleLine,
  RiMailAddLine,
} from "react-icons/ri";
import Card from "~/ui/card/Card";
import {
  Dropdown,
  DropdownBreak,
  DropdownContent,
  DropdownItem,
  DropdownItemIcon,
  DropdownTrigger,
} from "~/ui/dropdown/Dropdown";

export default function CandidateCard({
  candidate: { name, description, interviewStage, id: candidateId },
}: {
  candidate: Candidate;
}) {
  return (
    <Card className="gap-1 !p-2">
      <section className="flex gap-2">
        <h3 className="flex-grow text-lg text-black-900">{name}</h3>
        <CandidateCardDropdown />
      </section>
      <p className="line-clamp-2 text-black-600">{description}</p>
      <section className="mt-1 flex">
        <p className="flex-grow text-sm text-black-900">
          Applied: <span className="text-sm text-black-600">14-02-2024</span>
        </p>
        {interviewStage && (
          <p className="text-sm text-black-600">
            {interviewStage
              .split("_")
              .map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.toLowerCase().slice(1),
              )
              .join(" ")}
          </p>
        )}
      </section>
    </Card>
  );
}

function CandidateCardDropdown() {
  return (
    <div className="-mt-2 flex cursor-pointer items-center justify-center transition-transform">
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDots size={22} className="fill-black-900" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem>
            Show resume
            <DropdownItemIcon>
              <RiArticleLine />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownItem>
            Schedule
            <DropdownItemIcon>
              <RiCalendar2Line />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownItem>
            Send e-mail
            <DropdownItemIcon>
              <RiMailAddLine />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownBreak />
          <DropdownItem>
            Remove
            <DropdownItemIcon>
              <RiCloseCircleLine />
            </DropdownItemIcon>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
