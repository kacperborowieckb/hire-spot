"use client";

import { AnimatePresence } from "framer-motion";
import { RiArrowDownSLine } from "react-icons/ri";
import { useToggle } from "~/hooks/useToggle";
import { MotionDiv } from "~/ui/motion-components/MotionComponents";
import { extendContentVariants } from "~/utils/variants";

export default function Description({ desc }: { desc?: string }) {
  const [isDescOpen, toggleDesc] = useToggle(false);

  return (
    <>
      <div
        className="mt-4 flex cursor-pointer"
        onClick={toggleDesc}
        data-testid="expand-desc"
      >
        <h4 className="flex-grow font-bold">Desc:</h4>
        <MotionDiv
          animate={{
            rotate: isDescOpen ? 180 : 0,
          }}
        >
          <RiArrowDownSLine size={24} />
        </MotionDiv>
      </div>
      <AnimatePresence>
        {isDescOpen && (
          <MotionDiv
            variants={extendContentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="text-text-secondary overflow-hidden"
          >
            {desc}
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
}
