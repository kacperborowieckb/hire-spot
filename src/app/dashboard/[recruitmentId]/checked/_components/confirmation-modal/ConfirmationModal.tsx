import React from "react";
import Button from "~/ui/button/Button";
import Modal from "~/ui/modal/Modal";

type ConfirmationModalProps = {
  closeConfirmationModal: () => void;
  isLoading: boolean;
  removeCandidate: () => void;
};

export default function ConfirmationModal({
  closeConfirmationModal,
  removeCandidate,
  isLoading,
}: ConfirmationModalProps) {
  return (
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
  );
}
