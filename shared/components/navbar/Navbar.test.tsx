import { render } from "@testing-library/react";
import type { Dictionary } from "@/shared/types/i18n";
import dictJson from "@shared/i18n/dictionaries/enUS.json";
import Navbar from "./Navbar";

const dict = dictJson as Dictionary;

jest.mock("next/navigation", () => ({
  usePathname: () => "/en/campaigns",
  useParams: () => ({ lang: "en" }),
}));

describe("Navbar", () => {
  test("should render", () => {
    render(
      <Navbar campaignId={1} campaignName="Kintargo" dict={dict} user={null} />,
    );
  });
});
