import {
  ChangeEvent,
  HTMLAttributes,
  HTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import {
  FieldError,
  FieldValues,
  Merge,
  UseControllerProps,
  UseControllerReturn,
  useController,
} from "react-hook-form";
import { IconType } from "react-icons";

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
      <label htmlFor={controllerProps?.name}>{label}</label>
      <ControlledInput controller={controllerProps}>
        {({ field }) =>
          as === "textarea" ? (
            <textarea
              {...field}
              {...inputRest}
              aria-invalid={error !== undefined}
              onChange={(e) => field.onChange(e.target.value)}
              className="w-full rounded-lg bg-main-100 p-2 outline-main-600"
            />
          ) : (
            <div className="relative flex gap-2">
              <input
                {...field}
                {...inputRest}
                aria-invalid={error !== undefined}
                className="w-full rounded-lg bg-main-100 p-2 outline-main-600"
                onChange={(e) => {
                  let value: string | number = e.target.value;
                  if (inputProps.type === "number") {
                    value = validateNumberInputOnChange(Number(value));
                  }

                  field.onChange(value);
                }}
              />
              {Icon && <Icon />}
            </div>
          )
        }
      </ControlledInput>
    </div>
  );
}

function ControlledInput<T extends FieldValues>({
  controller,
  children,
}: {
  controller: NonNullable<InputProps<T>["controllerProps"]>;
  children: (props: { field: UseControllerReturn<T>["field"] }) => JSX.Element;
}) {
  const { field } = useController(controller);
  return <>{children({ field })}</>;
}
