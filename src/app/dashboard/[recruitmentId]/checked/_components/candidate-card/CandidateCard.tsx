"use client";

import { Candidate } from "@prisma/client";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  RiAccountPinBoxLine,
  RiArticleLine,
  RiCalendar2Line,
  RiCloseCircleLine,
  RiDiscussLine,
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
import dayjs from "dayjs";
import { toast } from "sonner";

type CandidateCardProps = React.HTMLAttributes<HTMLDivElement> & {
  candidate: Candidate;
  withDropdown?: boolean;
};

export default function CandidateCard({
  candidate: {
    name,
    description,
    interviewStage,
    id: candidateId,
    cvUrl,
    forInterview,
    scheduledFor,
  },
  withDropdown = true,
  onClick,
  className,
  ...otherProps
}: CandidateCardProps) {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const { recruitmentId } = useParams<{ recruitmentId: string }>();

  const utils = api.useUtils();

  const { mutate: deleteCandidate, isLoading } =
    api.candidate.deleteCandidate.useMutation({
      onSuccess: () => {
        utils.candidate.getCandidateById.invalidate({ candidateId });
        utils.candidate.getCandidatesByRecruitmentId.invalidate({
          recruitmentId,
        });
        utils.candidate.getUncheckedCandidatesByRecruitmentId.invalidate({
          recruitmentId,
        });
        utils.recruitment.getAllRecruitmentData.invalidate();
        toast.success("Candidate deleted");
        closeConfirmationModal();
      },
    });

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
          {withDropdown && (
            <CandidateCardDropdown
              candidateId={candidateId}
              openModal={openModal}
              openConfirmationModal={openConfirmationModal}
              showScheduleOption={interviewStage !== "COMPLETED"}
              showGoToInterviewOption={
                forInterview && interviewStage === "SCHEDULED"
              }
              showGoToSummaryOption={interviewStage === "COMPLETED"}
            />
          )}
        </section>
        <p className="line-clamp-2 flex-1 text-black-600">{description}</p>
        <section className="mt-1 flex">
          {/* TODO add appliedDate */}
          <p className="flex-grow text-sm text-black-900">
            Applied:{" "}
            <span className="whitespace-nowrap text-sm text-black-600">
              14-02-2024
            </span>
          </p>
          {scheduledFor ? (
            <p className="text-sm text-black-900">
              {interviewStage === "SCHEDULED" ? (
                <>
                  Scheduled:{" "}
                  <span className="whitespace-nowrap text-sm text-black-600">
                    {dayjs(scheduledFor).format("MM/DD/YYYY h:mm A")}
                  </span>
                </>
              ) : (
                "Completed"
              )}
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
  showScheduleOption: boolean;
  showGoToInterviewOption: boolean;
  showGoToSummaryOption: boolean;
};

function CandidateCardDropdown({
  candidateId,
  openModal,
  openConfirmationModal,
  showGoToInterviewOption,
  showGoToSummaryOption,
  showScheduleOption,
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

  const goToInterview = () =>
    router.push(`/dashboard/${recruitmentId}/interview/${candidateId}`);

  const goToSummary = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("candidate", candidateId);
    router.push(`/dashboard/${recruitmentId}/summary?${searchParams}`);
  };

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
          {showScheduleOption && (
            <DropdownItem onClick={scheduleCandidate}>
              Schedule
              <DropdownItemIcon>
                <RiCalendar2Line />
              </DropdownItemIcon>
            </DropdownItem>
          )}
          {showGoToInterviewOption && (
            <DropdownItem onClick={goToInterview}>
              Interview
              <DropdownItemIcon>
                <RiDiscussLine />
              </DropdownItemIcon>
            </DropdownItem>
          )}
          {showGoToSummaryOption && (
            <DropdownItem onClick={goToSummary}>
              Summary
              <DropdownItemIcon>
                <RiAccountPinBoxLine />
              </DropdownItemIcon>
            </DropdownItem>
          )}
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
