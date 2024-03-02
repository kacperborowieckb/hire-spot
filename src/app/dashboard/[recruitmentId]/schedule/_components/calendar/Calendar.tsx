import dayjs, { type Dayjs } from "dayjs";
import React, { useState } from "react";
import { RiArrowLeftDoubleLine, RiArrowRightDoubleLine } from "react-icons/ri";
import { cn } from "~/utils/cn";

type CalendarProps = {
  selectedValue?: Dayjs;
  onChange: (date: Dayjs) => void;
  events?: Dayjs[];
};

export default function Calendar({
  selectedValue = dayjs(),
  onChange,
  events = [],
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const currentYear = currentDate.year();
  const currentMonth = currentDate.month();
  const monthLength = currentDate.daysInMonth();
  const previousMonthLength = currentDate.month(currentMonth - 1).daysInMonth();
  const startingIndex =
    currentDate.startOf("month").day() === 0
      ? 6
      : currentDate.startOf("month").day() - 1;
  const endingIndex =
    currentDate.endOf("month").day() === 0
      ? 6
      : currentDate.endOf("month").day() - 1;

  const isInCurrentMonthAndYear =
    selectedValue.year() === currentYear &&
    selectedValue.month() === currentMonth;

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

  const handleChange = (date: Dayjs) => onChange(date);

  const shouldHaveAccent = (i: number): boolean =>
    selectedValue.date() === i && isInCurrentMonthAndYear;

  const isInEvents = (i: number): boolean => {
    return events.some((event) => {
      return event.isSame(
        dayjs().year(currentYear).month(currentMonth).date(i),
        "day",
      );
    });
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
      <div className="grid w-[300px] grid-cols-7 place-items-center gap-y-[2px]">
        {Array.from({ length: startingIndex }).map((_, i) => (
          <CalendarItem
            key={i}
            className="pointer-events-none font-light text-black-600"
            day={previousMonthLength - startingIndex + i + 1}
          />
        ))}
        {Array.from({ length: monthLength }).map((_, i) => (
          <CalendarItem
            className={cn(
              shouldHaveAccent(i + 1) && "bg-main-300 hover:bg-main-300",
              isInEvents(i + 1) && "bg-main-200 hover:bg-main-200",
            )}
            key={i + startingIndex}
            day={i + 1}
            onChange={() => handleChange(currentDate.date(i + 1))}
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
  onChange?: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
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
      onClick={onChange}
      {...otherProps}
    >
      {day}
    </span>
  );
}
