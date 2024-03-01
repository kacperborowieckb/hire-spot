"use client";

import React, { useEffect, useState } from "react";
import CandidateCard from "../../../checked/_components/candidate-card/CandidateCard";
import { cn } from "~/utils/cn";
import Button from "~/ui/button/Button";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import ScheduleFieldSet from "../schedule-field-set/ScheduleFieldSet";
import { Candidate } from "@prisma/client";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { api } from "~/trpc/react";
import { toast } from "sonner";

export default function ScheduleCandidate({
  pickedCandidate,
}: {
  pickedCandidate?: Candidate;
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<{
    hour: number;
    minute: number;
  }>({ hour: selectedDate.hour(), minute: selectedDate.minute() });
  const params = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const utils = api.useUtils();

  const { mutate: scheduleCandidate } =
    api.candidate.scheduleCandidate.useMutation({
      onSuccess: () => {
        toast.success("Candidate scheduled");
        utils.candidate.getCandidateById.invalidate({
          candidateId: pickedCandidate?.id,
        });
        utils.candidate.getCandidatesByRecruitmentId.invalidate({
          recruitmentId,
        });
      },
    });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hour, minute]: number[] = e.target.value
      .split(":")
      .map((item) => parseInt(item));

    if (hour !== undefined && minute !== undefined)
      setSelectedTime({ hour, minute });
  };

  const handleDateChange = (date: Dayjs) =>
    setSelectedDate(date.hour(selectedTime.hour).minute(selectedTime.minute));

  const removeSearchParams = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.delete("candidate");
    router.replace(`${pathname}?${searchParams}`);
  };

  const canSchedule = selectedDate && pickedCandidate;

  const handleSchedule = () => {
    if (!canSchedule) return;
    const dateTime = selectedDate.toDate();
    scheduleCandidate({
      candidateId: pickedCandidate.id,
      dateTime,
    });
  };

  useEffect(() => {
    setSelectedDate(
      selectedDate.hour(selectedTime.hour).minute(selectedTime.minute),
    );
  }, [selectedTime]);

  return (
    <div className="flex w-min flex-col gap-4">
      <h2 className="text-2xl text-black-900">Pick a candidate</h2>
      <div
        className={cn(
          "mx-auto h-[130px] w-[266px] justify-center rounded-lg border-2 border-dashed border-main-400",
          pickedCandidate && "border-none",
        )}
      >
        {pickedCandidate && (
          <CandidateCard
            candidate={pickedCandidate}
            onClick={removeSearchParams}
            className="cursor-pointer"
          />
        )}
      </div>
      <Calendar selectedValue={selectedDate} onChange={handleDateChange} />
      <ScheduleFieldSet handleTimeChange={handleTimeChange} />
      {pickedCandidate && (
        <p className="text-black-900">
          Schedule {pickedCandidate.name} for{" "}
          {selectedDate.format("dddd, MMMM D, YYYY h:mm A")}
        </p>
      )}
      <Button variant="default" onClick={handleSchedule}>
        Schedule
      </Button>
    </div>
  );
}
