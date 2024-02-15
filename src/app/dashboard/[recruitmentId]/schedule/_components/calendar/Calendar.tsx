import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { cn } from "~/utils/cn";

type CalendarProps = {
  value?: Dayjs;
  onChange: () => void;
};

export default function Calendar({ value = dayjs(), onChange }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(value);

  const currentYear = currentDate.year();
  const currentMonth = currentDate.month();
  const monthLength = currentDate.daysInMonth();
  const previousMonthLength = currentDate.month(currentMonth - 1).daysInMonth();
  const startingIndex = currentDate.day();
  const endingIndex = currentDate.endOf("month").day();

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentDate(dayjs(currentDate).year(currentYear - 1));
    }
    setCurrentDate(dayjs(currentDate).month(currentMonth - 1));
  };
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentDate(dayjs(currentDate).year(currentYear + 1));
    }
    setCurrentDate(dayjs(currentDate).month(currentMonth + 1));
  };

  return (
    <div>
      <div className="flex items-center px-4 py-2">
        <div className="cursor-pointer">
          <RiArrowLeftDoubleLine
            className="fill-black-900"
            onClick={handlePreviousMonth}
          />
        </div>
        <span className="mx-auto text-black-900">
          {currentDate.format("MMMM")} {currentYear}
        </span>
        <div className="cursor-pointer">
          <RiArrowRightDoubleLine
            className="fill-black-900"
            onClick={handleNextMonth}
          />
        </div>
      </div>
      <div className="grid w-[300px] grid-cols-7 place-items-center">
        {Array.from({ length: startingIndex }).map((_, i) => (
          <CalendarItem
            key={i}
            className="pointer-events-none font-light text-black-600"
            day={previousMonthLength - startingIndex + i + 1}
          />
        ))}
        {Array.from({ length: monthLength }).map((_, i) => (
          <CalendarItem
            key={i + startingIndex}
            day={i + 1}
            onChange={onChange}
          />
        ))}
        {Array.from({ length: 6 - endingIndex }).map((_, i) => (
          <CalendarItem
            key={monthLength + startingIndex + i}
            className="pointer-events-none font-light text-black-600"
            day={i + 1}
          />
        ))}
      </div>
    </div>
  );
}

type CalendarItemProps = React.HTMLAttributes<HTMLSpanElement> & {
  onChange?: () => void;
  day: number;
};

function CalendarItem({
  day,
  onChange,
  className,
  ...otherProps
}: CalendarItemProps) {
  return (
    <span
      className={cn(
        "flex aspect-square w-[32px] cursor-pointer items-center justify-center rounded-full hover:bg-main-200",
        className,
      )}
      {...otherProps}
    >
      {day}
    </span>
  );
}
