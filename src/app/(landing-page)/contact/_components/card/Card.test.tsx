import { render, screen } from "@testing-library/react";
import Card from "./Card";
import { RiLinkedinFill, RiMailFill, RiSaveFill } from "react-icons/ri";
import Link from "next/link";
import IconButton from "~/ui/icon-button/IconButton";
import userEvent from "@testing-library/user-event";

const copyMail = jest.fn();

describe("Card", () => {
  it("Should render correct items with link as children", () => {
    render(
      <Card
        title="Linkedin"
        content="For any interested recruiter."
        icon={RiLinkedinFill}
      >
        <Link href={"/"} className="text-main-600 hover:underline">
          www.linkedin.com/user
        </Link>
      </Card>,
    );

    const title = screen.getByRole("heading", { name: /Linkedin/i });
    const content = screen.getByText(/for any interested/i);
    const link = screen.getByRole("link");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });

  it("Should render correct items with button as children", async () => {
    render(
      <Card title="Mail" content="For anything." icon={RiMailFill}>
        <div className="flex items-center gap-2">
          <p className="truncate text-main-600">kacperborowiec.kb@gmail.com</p>
          <IconButton
            data-testid="action-button"
            Icon={RiSaveFill}
            onClick={copyMail}
            size={14}
          />
        </div>
      </Card>,
    );

    const title = screen.getByRole("heading", { name: /Mail/i });
    const content = screen.getByText(/for any/i);
    const email = screen.getByText(/kacperborowiec/i);
    const button = screen.getByTestId("action-button");

    expect(title).toBeInTheDocument();
    expect(content).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    await userEvent.click(button);
    expect(copyMail).toHaveBeenCalled();
  });
});
