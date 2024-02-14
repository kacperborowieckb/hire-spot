import { cn } from "~/utils/cn";

type ColumnProps = {
  title: string;
  titleColor?: string;
  children?: React.ReactNode;
};

export default function Column({
  title,
  titleColor = "text-black-900",
  children,
}: ColumnProps) {
  return (
    <section
      className={cn(
        "flex min-w-[300px] max-w-[300px] flex-col gap-4 rounded-md border border-border bg-main-50 p-4 shadow-lg",
        titleColor,
      )}
    >
      <div>
        <h2 className="mb-1 text-xl">{title}</h2>
        <hr className="rounded-full border-border" />
      </div>
      <div className="-mx-1 flex h-0 flex-1 basis-auto flex-col gap-4 overflow-y-auto px-1">
        {children}
      </div>
    </section>
  );
}
