import { render } from "@testing-library/react";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("should render", () => {
    render(<Navbar campaignId={0} campaignName={"Kintargo"} dict={} />);
  });
});
