import { render } from "@testing-library/react";
import InfoCard from "./InfoCard";
import { Ri24HoursFill } from "react-icons/ri";

const mockInfoCard = (
  <InfoCard
    icon={<Ri24HoursFill />}
    percentage={20}
    title="mockTitle"
    value={80}
  />
);

describe("InfoCard", () => {
  it("Should render", () => {
    render(mockInfoCard);
  });
});
