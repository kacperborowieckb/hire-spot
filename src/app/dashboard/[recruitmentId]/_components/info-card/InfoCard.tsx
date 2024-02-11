import React from "react";
import Card from "~/ui/card/Card";

type InfoCardProps = {
  icon: JSX.Element;
  title: string;
  value: number;
  percentage: number;
};

export default function InfoCard({
  icon,
  title,
  value,
  percentage,
}: InfoCardProps) {
  return (
    <Card>
      <>
        <div className="flex-grow">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-main-600">
            {icon}
          </div>
        </div>
        <div className="text-black-900 flex flex-col text-lg">
          <h4>{title}</h4>
          <div className="flex gap-2">
            <p className="text-3xl font-bold leading-none text-main-600">
              {value}
            </p>
            <span className="text-black-900 mt-auto flex h-min items-center justify-center rounded-md bg-main-200 px-2 text-sm">
              {percentage}%
            </span>
          </div>
        </div>
      </>
    </Card>
  );
}
