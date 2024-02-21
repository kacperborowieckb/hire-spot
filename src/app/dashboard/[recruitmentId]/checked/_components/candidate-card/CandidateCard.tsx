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
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { api } from "~/trpc/react";
import Modal from "~/ui/modal/Modal";
import Button from "~/ui/button/Button";

export default function CandidateCard({
  candidate: { name, description, interviewStage, id: candidateId, cvUrl },
}: {
  candidate: Candidate;
}) {
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
      {showModal && <CvModal cvUrl={cvUrl} closeModal={closeModal} />}
      {showConfirmationModal && (
        <Modal
          closeModal={closeConfirmationModal}
          className="max-w-[320px] text-lg text-black-900"
        >
          <h2>Are you sure you want remove this candidate from recruitment?</h2>
          <p className="mt-2 text-base text-black-600">
            All data and the resume will be permanently deleted.
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <Button
              disabled={isLoading}
              variant="outline"
              className="z-50 min-w-[76px]"
              onClick={closeConfirmationModal}
            >
              No
            </Button>
            <Button
              disabled={isLoading}
              variant="default"
              className="z-50 min-w-[76px]"
              onClick={removeCandidate}
            >
              Yes
            </Button>
          </div>
        </Modal>
      )}
      <Card className="gap-1 !p-2">
        <section className="flex gap-2">
          <h3 className="flex-grow text-lg text-black-900">{name}</h3>
          <CandidateCardDropdown
            candidateId={candidateId}
            openModal={openModal}
            openConfirmationModal={openConfirmationModal}
          />
        </section>
        <p className="line-clamp-2 text-black-600">{description}</p>
        <section className="mt-1 flex">
          <p className="flex-grow text-sm text-black-900">
            Applied: <span className="text-sm text-black-600">14-02-2024</span>
          </p>
          {interviewStage && (
            <p className="text-sm text-black-600">
              {interviewStage
                .split("_")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.toLowerCase().slice(1),
                )
                .join(" ")}
            </p>
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
  const { recruitmentId } = useParams<{ recruitmentId: string }>();
  const router = useRouter();
  const searchParams = new URLSearchParams({ candidate: candidateId });

  const showResume = () => openModal();

  const scheduleCandidate = () =>
    router.push(`/dashboard/${recruitmentId}/schedule?${searchParams}`);

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
