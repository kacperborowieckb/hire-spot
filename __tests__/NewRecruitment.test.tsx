import NewRecruitment from "~/app/dashboard/(recruitments)/new/page";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { api } from "~/trpc/react";

const { mutate } = api.recruitment.addRecruitment.useMutation();

const mutateMock = mutate as jest.Mock;

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("NewRecruitment", () => {
  describe("Render", () => {
    it("Should render form with inputs", () => {
      render(<NewRecruitment />);

      const form = screen.getByRole("form");
      const positionTitleInput = screen.getByLabelText(/position title/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      expect(form).toBeInTheDocument();
      expect(positionTitleInput).toBeInTheDocument();
      expect(descriptionInput).toBeInTheDocument();
    });

    it("Should render a heading", () => {
      render(<NewRecruitment />);

      const heading = screen.getByRole("heading", { name: /recruitment/i });

      expect(heading).toBeInTheDocument();
    });

    it("Should render a button", () => {
      render(<NewRecruitment />);

      const button = screen.getByRole("button");

      expect(button).toBeInTheDocument();
    });

    it("Should render an img", () => {
      render(<NewRecruitment />);

      const img = screen.getByRole("img");

      expect(img).toBeInTheDocument();
    });
  });

  describe("Behavior", () => {
    it("Should call mutate on button click", async () => {
      render(<NewRecruitment />);

      const button = screen.getByRole("button");
      const positionTitleInput = screen.getByLabelText(/position title/i);
      const descriptionInput = screen.getByLabelText(/description/i);

      await userEvent.type(positionTitleInput, "title");
      await userEvent.type(descriptionInput, "desc");
      await userEvent.click(button);

      expect(mutateMock).toHaveBeenCalledWith({
        positionTitle: "title",
        description: "desc",
      });
    });
    it("Should not call mutate on button click when invalid data", async () => {
      render(<NewRecruitment />);

      const button = screen.getByRole("button");
      const positionTitleInput = screen.getByLabelText(/position title/i);

      await userEvent.type(positionTitleInput, "s");
      await userEvent.click(button);

      expect(mutateMock).not.toHaveBeenCalled();
    });
  });
});
