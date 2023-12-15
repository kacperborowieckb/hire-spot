import React, { InputHTMLAttributes, type LabelHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";
import { ControlledInput } from "../input/Input";

type InputBaseProps = {
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  label: string;
  errorMessage?: string;
};

type InputProps<T extends FieldValues> = InputBaseProps & {
  controllerProps: UseControllerProps<T>;
};

export default function FileInput<T extends FieldValues>({
  label,
  inputProps = {},
  labelProps = {},
  errorMessage,
  controllerProps,
}: InputProps<T>) {
  const { className: labelClass, ...labelRest } = labelProps;
  const { className: inputClass, ...inputRest } = inputProps;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={controllerProps?.name}
        {...labelRest}
        className={`${labelClass ?? ""}`}
      >
        {label}
      </label>
      <ControlledInput controller={controllerProps}>
        {({ field }) => (
          <div className="relative">
            <input
              {...field}
              {...inputRest}
              value={inputRest.value}
              id={controllerProps.name}
              type="file"
              aria-invalid={errorMessage !== undefined}
              className={`mb-3 w-full rounded-lg border-2 border-dashed border-main-200 bg-main-100 p-4 shadow-md outline-main-600 ${
                errorMessage
                  ? "border-error-border-dark outline-error-border-dark"
                  : ""
              }`}
              onChange={(e) => {
                const files = e.target.files;
                if (files?.length) {
                  field.onChange(files[0]);
                }
              }}
            />
            {errorMessage && (
              <span className="absolute left-0 top-[calc(100%-12px)] text-sm text-error-text">
                ${errorMessage}
              </span>
            )}
          </div>
        )}
      </ControlledInput>
    </div>
  );
}
