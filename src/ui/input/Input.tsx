import type { InputHTMLAttributes, LabelHTMLAttributes } from "react";
import {
  type FieldError,
  type FieldValues,
  type Merge,
  type UseControllerProps,
  type UseControllerReturn,
  useController,
} from "react-hook-form";
import type { IconType } from "react-icons";

type InputBaseProps = {
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>;
  inputProps?: InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>;
  label: string;
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  Icon?: IconType;
};

type InputProps<T extends FieldValues> = InputBaseProps & {
  as?: "text" | "textarea";
  controllerProps: UseControllerProps<T>;
};

export default function Input<T extends FieldValues>({
  label,
  inputProps = {},
  labelProps = {},
  error,
  Icon,
  controllerProps,
  as = "text",
}: InputProps<T>) {
  const { className: labelClass, ...labelRest } = labelProps;
  const { className: inputClass, ...inputRest } = inputProps;

  const validateNumberInputOnChange = (value: number): number => {
    const max = inputProps.max as number;
    const min = inputProps.min as number;
    if (isNaN(value)) {
      value = 0;
    } else if (inputProps.max && value > max) {
      return max;
    } else if (inputProps.min && value < min) {
      return min;
    }
    return value;
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
        {({ field }) =>
          as === "textarea" ? (
            <div className="relative h-full">
              <textarea
                {...field}
                {...inputRest}
                id={controllerProps.name}
                aria-invalid={error !== undefined}
                onChange={(e) => field.onChange(e.target.value)}
                className={`mb-3 w-full rounded-lg border-2 border-main-200 bg-main-100 p-2 shadow-md outline-main-600 ${
                  inputClass ?? ""
                } ${
                  error
                    ? "border-error-border-dark outline-error-border-dark"
                    : ""
                }`}
              />
              {error && (
                <span className="absolute left-0 top-[calc(100%)] text-sm text-error-text">
                  {error.message}
                </span>
              )}
            </div>
          ) : (
            <div className="relative">
              <input
                {...field}
                {...inputRest}
                id={controllerProps.name}
                aria-invalid={error !== undefined}
                className={`mb-3 w-full rounded-lg border-2 border-main-200 bg-main-100 p-2 shadow-md outline-main-600 ${
                  error
                    ? "border-error-border-dark outline-error-border-dark"
                    : ""
                }`}
                onChange={(e) => {
                  let value: string | number = e.target.value;
                  if (inputProps.type === "number") {
                    value = validateNumberInputOnChange(Number(value));
                  }

                  field.onChange(value);
                }}
              />
              {Icon && <Icon />}
              {error && (
                <span className="absolute left-0 top-[calc(100%-12px)] text-sm text-error-text">
                  {error.message}
                </span>
              )}
            </div>
          )
        }
      </ControlledInput>
    </div>
  );
}

export function ControlledInput<T extends FieldValues>({
  controller,
  children,
}: {
  controller: NonNullable<InputProps<T>["controllerProps"]>;
  children: (props: { field: UseControllerReturn<T>["field"] }) => JSX.Element;
}) {
  const { field } = useController(controller);
  return <>{children({ field })}</>;
}
