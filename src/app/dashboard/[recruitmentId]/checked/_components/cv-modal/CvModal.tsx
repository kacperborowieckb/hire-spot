import React from "react";
import PDFView from "../../../check/_components/pdf-view/PDFView";
import Modal from "~/ui/modal/Modal";
import Button from "~/ui/button/Button";

type CvModalProps = {
  cvUrl: string;
  closeModal: () => void;
};

export default function CvModal({ closeModal, cvUrl }: CvModalProps) {
  return (
    <Modal className="p-0" closeModal={closeModal}>
      <PDFView pdf={cvUrl} />
      <Button
        variant="outline"
        className="absolute right-2 top-2 z-50"
        onClick={closeModal}
      >
        Close
      </Button>
    </Modal>
  );
}
