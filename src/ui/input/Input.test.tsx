import { render, screen } from "@testing-library/react";
import Input from "./Input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import userEvent from "@testing-library/user-event";

const TestInputSchema = z.object({
  username: z.string(),
});

type TTestInputSchema = z.infer<typeof TestInputSchema>;

const InputForTests = ({
  as = "text",
  error,
}: {
  as?: "text" | "textarea";
  error?: string;
}) => {
  const { control } = useForm<TTestInputSchema>({
    resolver: zodResolver(TestInputSchema),
    defaultValues: { username: "" },
  });
  return (
    <Input
      label="Username"
      controllerProps={{ name: "username", control }}
      as={as}
      error={{ message: error }}
    />
  );
};

describe("Input", () => {
  describe("Render", () => {
    it("Should render input with label", () => {
      render(<InputForTests />);

      const input = screen.getByLabelText(/username/i);

      expect(input).toBeInTheDocument();
    });

    it("Should render textarea with label", () => {
      render(<InputForTests as="textarea" />);

      const textarea = screen.getByLabelText(/username/i);

      expect(textarea).toBeInTheDocument();
    });

    it("Should render error in input", () => {
      render(<InputForTests error="error" />);

      const error = screen.getByText(/error/i);

      expect(error).toBeInTheDocument();
    });

    it("Should render error in textarea", () => {
      render(<InputForTests error="error" as="textarea" />);

      const error = screen.getByText(/error/i);

      expect(error).toBeInTheDocument();
    });

    it("Should not render error in input", () => {
      render(<InputForTests />);

      const error = screen.queryByText(/error/i);

      expect(error).not.toBeInTheDocument();
    });

    it("Should not render error in textarea", () => {
      render(<InputForTests as="textarea" />);

      const error = screen.queryByText(/error/i);

      expect(error).not.toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("Should have correct value in input", async () => {
      render(<InputForTests />);

      const input = screen.getByLabelText(/username/i) as HTMLInputElement;

      expect(input.value).toBe("");

      await userEvent.type(input, "My username");

      expect(input.value).toBe("My username");
    });

    it("Should have correct value in textarea", async () => {
      render(<InputForTests as="textarea" />);

      const textarea = screen.getByLabelText(
        /username/i,
      ) as HTMLTextAreaElement;

      expect(textarea.value).toBe("");

      await userEvent.type(textarea, "My username");

      expect(textarea.value).toBe("My username");
    });
  });
});
