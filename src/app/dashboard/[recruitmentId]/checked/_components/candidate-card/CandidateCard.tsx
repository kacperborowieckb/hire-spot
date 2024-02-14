"use client";

import { BsThreeDots } from "react-icons/bs";
import { RiAB } from "react-icons/ri";
import Card from "~/ui/card/Card";
import {
  Dropdown,
  DropdownBreak,
  DropdownContent,
  DropdownItem,
  DropdownItemIcon,
  DropdownTrigger,
} from "~/ui/dropdown/Dropdown";

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
        <div className="-mt-2 flex cursor-pointer items-center justify-center transition-transform">
          <Dropdown>
            <DropdownTrigger>
              <BsThreeDots size={22} className="fill-black-900" />
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem>Social</DropdownItem>
              <DropdownItem>Social</DropdownItem>
              <DropdownItem>Social</DropdownItem>
              <DropdownBreak />
              <DropdownItem>Social</DropdownItem>
              <DropdownItem>Social</DropdownItem>
              <DropdownItem>Social</DropdownItem>
              <DropdownItem>
                Social
                <DropdownItemIcon>
                  <RiAB />
                </DropdownItemIcon>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
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
