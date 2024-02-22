"use client";

import { Candidate } from "@prisma/client";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  RiArticleLine,
  RiCalendar2Line,
  RiCloseCircleLine,
  RiMailAddLine,
} from "react-icons/ri";
import Card from "~/ui/card/Card";
import {
  Dropdown,
  DropdownBreak,
  DropdownContent,
  DropdownItem,
  DropdownItemIcon,
  DropdownTrigger,
} from "~/ui/dropdown/Dropdown";
import CvModal from "../cv-modal/CvModal";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { api } from "~/trpc/react";
import { AnimatePresence } from "framer-motion";
import { cn } from "~/utils/cn";
import ConfirmationModal from "../confirmation-modal/ConfirmationModal";

type CandidateCardProps = React.HTMLAttributes<HTMLDivElement> & {
  candidate: Candidate;
};

export default function CandidateCard({
  candidate: {
    name,
    description,
    interviewStage,
    id: candidateId,
    cvUrl,
    forInterview,
  },
  onClick,
  className,
  ...otherProps
}: CandidateCardProps) {
  const { mutate: deleteCandidate, isLoading } =
    api.candidate.deleteCandidate.useMutation({
      onSuccess: () => closeConfirmationModal(),
    });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openConfirmationModal = () => setShowConfirmationModal(true);
  const closeConfirmationModal = () => setShowConfirmationModal(false);

  const removeCandidate = () => deleteCandidate({ candidateId, cvUrl });

  return (
    <>
      <AnimatePresence>
        {showModal && <CvModal cvUrl={cvUrl} closeModal={closeModal} />}
        {showConfirmationModal && (
          <ConfirmationModal
            closeConfirmationModal={closeConfirmationModal}
            isLoading={isLoading}
            removeCandidate={removeCandidate}
          />
        )}
      </AnimatePresence>
      <Card
        className={cn("gap-1 !p-2", className)}
        onClick={onClick}
        {...otherProps}
      >
        <section className="flex gap-2">
          <h3 className="flex-grow text-lg text-black-900">{name}</h3>
          <CandidateCardDropdown
            candidateId={candidateId}
            openModal={openModal}
            openConfirmationModal={openConfirmationModal}
          />
        </section>
        <p className="line-clamp-2 flex-1 text-black-600">{description}</p>
        <section className="mt-1 flex">
          <p className="flex-grow text-sm text-black-900">
            Applied: <span className="text-sm text-black-600">14-02-2024</span>
          </p>
          {forInterview ? (
            <p className="text-sm text-black-600">
              {interviewStage
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.toLowerCase().slice(1),
                )
                .join(" ")}
            </p>
          ) : (
            <p className="text-sm text-black-600">No interview</p>
          )}
        </section>
      </Card>
    </>
  );
}

type CandidateCardDropdownProps = {
  candidateId: string;
  openModal: () => void;
  openConfirmationModal: () => void;
};

function CandidateCardDropdown({
  candidateId,
  openModal,
  openConfirmationModal,
}: CandidateCardDropdownProps) {
  const params = useSearchParams();
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const router = useRouter();

  const showResume = () => openModal();

  const scheduleCandidate = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("candidate", candidateId);
    router.push(`/dashboard/${recruitmentId}/schedule?${searchParams}`);
  };

  //TODO navigate to email management page
  const sendEmailToCandidate = () => {};

  const removeCandidate = () => openConfirmationModal();

  return (
    <div className="-mt-2 flex cursor-pointer items-center justify-center transition-transform">
      <Dropdown>
        <DropdownTrigger>
          <BsThreeDots size={22} className="fill-black-900" />
        </DropdownTrigger>
        <DropdownContent>
          <DropdownItem onClick={showResume}>
            Show resume
            <DropdownItemIcon>
              <RiArticleLine />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownItem onClick={scheduleCandidate}>
            Schedule
            <DropdownItemIcon>
              <RiCalendar2Line />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownItem onClick={sendEmailToCandidate}>
            Send e-mail
            <DropdownItemIcon>
              <RiMailAddLine />
            </DropdownItemIcon>
          </DropdownItem>
          <DropdownBreak />
          <DropdownItem onClick={removeCandidate}>
            Remove
            <DropdownItemIcon>
              <RiCloseCircleLine />
            </DropdownItemIcon>
          </DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  );
}
