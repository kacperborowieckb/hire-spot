import { render, screen, waitFor } from "@testing-library/react";
import ApplyForm from "./ApplyForm";
import { api } from "~/trpc/react";
import userEvent from "@testing-library/user-event";
import { useUploadThing } from "~/utils/uploadthing";

const { mutate } = api.candidate.addCandidate.useMutation();
const { startUpload } = useUploadThing("imageUploader");

const startUploadMock = startUpload as jest.Mock;
const mutateMock = mutate as jest.Mock;

const testFile = new File(["foo"], "testCv.pdf", { type: "application/pdf" });

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock("../../../../../utils/uploadthing", () => ({
  useUploadThing: jest
    .fn()
    .mockReturnValue({ startUpload: jest.fn(), isUploading: false }),
}));

jest.mock("../../../../../trpc/react", () => ({
  api: {
    candidate: {
      addCandidate: {
        useMutation: jest.fn().mockReturnValue({ mutate: jest.fn() }),
      },
    },
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Apply Form", () => {
  describe("Render", () => {
    it("Should render a form", () => {
      render(<ApplyForm />);

      const form = screen.getByRole("form");

      expect(form).toBeInTheDocument();
    });

    it("Should render correct inputs", () => {
      render(<ApplyForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const descInput = screen.getByLabelText(/let us/i);
      const cvInput = screen.getByLabelText(/cv/i);

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(descInput).toBeInTheDocument();
      expect(cvInput).toBeInTheDocument();
    });

    it("Should render a button", () => {
      render(<ApplyForm />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("Should not call function without input data", async () => {
      render(<ApplyForm />);

      const button = screen.getByRole("button");
      await userEvent.click(button);

      expect(mutateMock).not.toHaveBeenCalled();
      expect(startUploadMock).not.toHaveBeenCalled();
    });

    it("Should not call function with wrong data", async () => {
      render(<ApplyForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const cvInput = screen.getByLabelText(/cv/i);
      const button = screen.getByRole("button");

      await userEvent.type(nameInput, "User name");
      await userEvent.type(emailInput, "email@email");
      await userEvent.upload(cvInput, testFile);
      await userEvent.click(button);

      expect(mutateMock).not.toHaveBeenCalled();
      expect(startUploadMock).not.toHaveBeenCalled();
    });

    it("Should call function with correct data", async () => {
      render(<ApplyForm />);

      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const cvInput = screen.getByLabelText(/cv/i);
      const button = screen.getByRole("button");

      await userEvent.type(nameInput, "User name");
      await userEvent.type(emailInput, "email@email.pl");
      await userEvent.upload(cvInput, testFile);
      await userEvent.click(button);

      expect(startUploadMock).toHaveBeenCalled();
      waitFor(() => expect(mutateMock).toHaveBeenCalled());
    });
  });
});
