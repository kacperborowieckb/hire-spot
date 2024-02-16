"use client";

import React, { useEffect, useState } from "react";
import CandidateCard from "../../../checked/_components/candidate-card/CandidateCard";
import { cn } from "~/utils/cn";
import Button from "~/ui/button/Button";
import Calendar from "../calendar/Calendar";
import dayjs, { Dayjs } from "dayjs";
import ScheduleFieldSet from "../../schedule-field-set/ScheduleFieldSet";

export default function ScheduleCandidate({
  pickedCandidate,
}: {
  pickedCandidate?: any;
}) {
  const [sendConfirmation, setSendConfirmation] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const [selectedTime, setSelectedTime] = useState<{
    hour: number;
    minute: number;
  }>({ hour: selectedDate.hour(), minute: selectedDate.minute() });

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hour, minute]: number[] = e.target.value
      .split(":")
      .map((item) => parseInt(item));

    if (hour !== undefined && minute !== undefined)
      setSelectedTime({ hour, minute });
  };

  const handleDateChange = (date: Dayjs) =>
    setSelectedDate(date.hour(selectedTime.hour).minute(selectedTime.minute));

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
        )}
      >
        {/* <CandidateCard
          name="John Petrucci"
          desc="Software engineer with a lot of experience that are passionate about cats"
          applied="14-02-2024"
          candidateId="ID"
          interviewStage="No interview"
        /> */}
      </div>
      <Calendar selectedValue={selectedDate} onChange={handleDateChange} />
      <ScheduleFieldSet
        handleTimeChange={handleTimeChange}
        sendConfirmation={sendConfirmation}
        setSendConfirmation={setSendConfirmation}
      />
      <p className="-mt-4 text-center text-sm text-black-600">
        (Candidate have to confirm this date before interview will be scheduled)
      </p>
      <p className="text-black-900">
        Schedule John Petrucci for{" "}
        {selectedDate.format("dddd, MMMM D, YYYY h:mm A")}
      </p>
      <Button variant="default">Schedule</Button>
    </div>
  );
}
