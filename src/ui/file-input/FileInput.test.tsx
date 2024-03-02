import { render, screen } from "@testing-library/react";
import FileInput from "./FileInput";
import { useForm } from "react-hook-form";
import { type TApplySchema, applySchema } from "~/schemas/applySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

const testFile = new File(["foo"], "testCv.pdf", { type: "application/pdf" });

const FileInputForTests = ({ error }: { error?: string }) => {
  const { control } = useForm<TApplySchema>({
    resolver: zodResolver(applySchema),
  });
  return (
    <FileInput
      label="CV"
      controllerProps={{ name: "cv", control }}
      errorMessage={error}
    />
  );
};

describe("File input", () => {
  describe("Render", () => {
    it("Should render correctly", () => {
      render(<FileInputForTests />);

      const input = screen.getByLabelText(/CV/i);

      expect(input).toBeInTheDocument();
    });

    it("Should render with error", () => {
      render(<FileInputForTests error="error" />);

      const errorMessage = screen.getByText(/error/i);

      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("Should contain file on upload", async () => {
      render(<FileInputForTests />);

      const input: HTMLInputElement = screen.getByLabelText(/CV/i);

      await userEvent.upload(input, testFile);
      const fileName = screen.getByText(/testCv.pdf/i);

      expect(input.files?.length).toBe(1);
      expect(fileName).toBeInTheDocument();
    });
  });
});
