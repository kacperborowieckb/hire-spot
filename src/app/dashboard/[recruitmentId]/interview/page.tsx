"use client";

import React, { useState } from "react";
import Calendar from "../schedule/_components/calendar/Calendar";
import dayjs, { type Dayjs } from "dayjs";
import { api } from "~/trpc/react";
import CandidateCard from "../checked/_components/candidate-card/CandidateCard";
import NoInterviews from "./_components/NoInterviews";
import Column from "../checked/_components/column/Column";
import Link from "next/link";
import InterviewLoadingState from "./_components/interview-loading-state/InterviewLoadingState";

export default function Interview({
  params: { recruitmentId },
}: {
  params: { recruitmentId: string };
}) {
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());
  const { data: candidates = [], isLoading } =
    api.candidate.getCandidatesByRecruitmentId.useQuery({ recruitmentId });

  const today = dayjs();
  const candidatesForInterview = candidates.filter(
    (candidate) => candidate.forInterview,
  );

  const handleDateChange = (date: Dayjs) => setSelectedDate(date);

  const candidatesForToday = candidatesForInterview.filter((candidate) =>
    today.isSame(dayjs(candidate.scheduledFor), "day"),
  );
  const candidatesForSelectedDay = candidatesForInterview.filter((candidate) =>
    selectedDate.isSame(dayjs(candidate.scheduledFor), "day"),
  );

  const events = candidatesForInterview.map((candidate) =>
    dayjs(candidate.scheduledFor),
  );

  if (isLoading) return <InterviewLoadingState />;

  return (
    <section className="mb-14 flex w-full flex-grow flex-col items-center gap-6 p-4 sm:mb-0 md:flex-row md:items-stretch lg:p-8">
      <div className="flex w-min flex-col">
        <h2 className="text-lg font-semibold">Select interview</h2>
        <p className="mb-2 text-base text-black-600">
          Click on candidate card you are interviewing
        </p>
        <Column title={"Today's interviews"} className="flex-grow">
          {candidatesForToday.length > 0 ? (
            candidatesForToday.map((candidate, i) => (
              <Link
                key={i}
                href={`/dashboard/${recruitmentId}/interview/${candidate.id}`}
              >
                <CandidateCard
                  candidate={candidate}
                  className="max-w-[350px]"
                  withDropdown={false}
                />
              </Link>
            ))
          ) : (
            <NoInterviews />
          )}
        </Column>
      </div>
      <div className="flex flex-col gap-8">
        <Calendar
          selectedValue={selectedDate}
          onChange={handleDateChange}
          events={events}
        />
        <Column
          title={`Interviews for ${selectedDate.format("DD-MM-YYYY")}`}
          className="flex-grow"
        >
          {candidatesForSelectedDay.length > 0 ? (
            candidatesForSelectedDay.map((candidate, i) => (
              <Link
                key={i}
                href={`/dashboard/${recruitmentId}/interview/${candidate.id}`}
              >
                <CandidateCard candidate={candidate} withDropdown={false} />
              </Link>
            ))
          ) : (
            <NoInterviews />
          )}
        </Column>
      </div>
    </section>
  );
}
