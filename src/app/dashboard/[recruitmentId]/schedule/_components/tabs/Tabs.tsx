import { useEffect } from "react";
import { useWindowSize } from "~/hooks/useWindowSize";
import { cn } from "~/utils/cn";

type TabsProps = {
  tab: "yes" | "strongYes" | "both";
  setTab: React.Dispatch<React.SetStateAction<"yes" | "strongYes" | "both">>;
};

export default function Tabs({ tab, setTab }: TabsProps) {
  const { width } = useWindowSize();

  useEffect(() => {
    if (!width) return;
    if (width <= 1050 && tab === "both") setTab("yes");
    if (width > 1050 && tab !== "both") setTab("both");
    // eslint-disable-next-line
  }, [width]);

  return (
    <div className="mx-auto mb-2 hidden w-max gap-2 rounded-lg bg-main-200 p-1 max-[1050px]:flex ">
      <button
        className={cn(
          "cursor-pointer rounded-md px-4 hover:bg-main-300",
          tab === "yes" && "bg-main-400 hover:bg-main-400",
        )}
        onClick={() => setTab("yes")}
      >
        Yes
      </button>
      <button
        className={cn(
          "cursor-pointer rounded-md px-4 hover:bg-main-300",
          tab === "strongYes" && "bg-main-400 hover:bg-main-400",
        )}
        onClick={() => setTab("strongYes")}
      >
        Strong yes
      </button>
    </div>
  );
}
