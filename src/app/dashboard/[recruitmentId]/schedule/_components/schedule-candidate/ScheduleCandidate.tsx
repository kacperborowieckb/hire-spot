"use client";

import React, { useState } from "react";
import CandidateCard from "../../../checked/_components/candidate-card/CandidateCard";
import { cn } from "~/utils/cn";
import Button from "~/ui/button/Button";
import Calendar from "../calendar/Calendar";
import dayjs from "dayjs";

export default function ScheduleCandidate({
  pickedCandidate,
}: {
  pickedCandidate?: any;
}) {
  const [sendConfirmation, setSendConfirmation] = useState<boolean>(false);

  return (
    <div className="flex w-min flex-col gap-4">
      <h2 className="text-2xl text-black-900">Pick a candidate</h2>
      <div
        className={cn(
          "h-[130px] w-[266px] rounded-lg border-2 border-dashed border-main-400",
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
      <Calendar value={dayjs()} onChange={() => {}} />
      <div className="flex gap-2">
        <input
          type="checkbox"
          className="w-4 accent-main-400"
          checked={sendConfirmation}
          id="sendConfirmation"
          name="sendConfirmation"
          onChange={() => setSendConfirmation(!sendConfirmation)}
        />
        <label htmlFor="sendConfirmation">Send e-mail with confirmation</label>
      </div>
      <p className="-mt-4 text-center text-sm text-black-600">
        (Candidate have to confirm this date before interview will be scheduled)
      </p>
      <p className="text-black-900">
        Schedule John Petrucci for 18.02.2024. 16:00
      </p>
      <Button variant="default">Schedule</Button>
    </div>
  );
}
