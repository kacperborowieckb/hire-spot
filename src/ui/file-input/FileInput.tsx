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

  const addOnDragOverClassLists = (e: React.DragEvent<HTMLInputElement>) => {
    e.currentTarget.classList.add("bg-main-200");
    e.currentTarget.classList.add("border-main-400");
    e.currentTarget.classList.add("file:border-main-400");
  };

  const clearOnDragOverClassLists = (e: React.DragEvent<HTMLInputElement>) => {
    e.currentTarget.classList.remove("bg-main-200");
    e.currentTarget.classList.remove("border-main-400");
    e.currentTarget.classList.remove("file:border-main-400");
  };

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    addOnDragOverClassLists(e);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearOnDragOverClassLists(e);
  };

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
              className={`mb-3 flex w-full rounded-lg border-2 border-dashed border-main-200 bg-main-100 p-4 text-[0] text-transparent shadow-md outline-main-600 file:mx-auto file:my-4 file:flex file:cursor-pointer file:rounded-lg file:border-2 file:border-dashed file:border-main-200 file:bg-transparent file:px-4 file:py-2 file:text-base file:font-medium file:hover:border-main-400 file:active:border-main-300 ${
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
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length) {
                  field.onChange(files[0]);
                }
                clearOnDragOverClassLists(e);
              }}
            />
            {field?.value?.name && (
              <span className="absolute bottom-5 left-1/2 -translate-x-1/2">
                {field.value.name}
              </span>
            )}
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
