import React, { InputHTMLAttributes } from "react";
import { IconType } from "react-icons";
import { cn } from "~/utils/cn";

type ClearInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  labelClasses?: string;
  Icon?: IconType;
};

export default function ClearInput({
  placeholder,
  name,
  labelClasses,
  label,
  onChange,
  Icon,
  ...otherProps
}: ClearInputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={name} className={cn(labelClasses)}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          {...otherProps}
          placeholder={placeholder}
          id={name}
          className={`my-1 w-full rounded-lg border-2 border-main-200 bg-main-100 p-2 shadow-md outline-main-600 placeholder:text-main-300`}
          onChange={onChange}
        />
        {Icon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Icon size={20} className="fill-main-300" />
          </div>
        )}
      </div>
    </div>
  );
}
