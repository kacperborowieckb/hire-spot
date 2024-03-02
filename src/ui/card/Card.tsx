import { cn } from "~/utils/cn";

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export default function Card({
  className,
  children,
  ...otherProps
}: CardProps) {
  return (
    <div
      className={cn(
        "flex min-h-[126px] flex-col rounded-lg border border-border bg-main-50 p-4 shadow-md",
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
