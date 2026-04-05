import { Dictionary } from "@/shared/types/i18n";

const navbarLinks = (dict: Dictionary, isInCampaign: boolean) => {
  const navbarDict = dict.navbar;

  if (isInCampaign) {
    return [
      {
        href: "/dashboard",
        label: navbarDict.dashboard,
      },
      {
        href: "/session-review",
        label: navbarDict.session_review,
      },
      {
        href: "/npc-creation",
        label: navbarDict.npc_creation,
      },
      {
        href: "/notes",
        label: navbarDict.notes,
      },
      {
        href: "/world-building",
        label: navbarDict.world_building,
      },
    ];
  } else {
    return [
      {
        href: "/campaigns",
        label: navbarDict.campaigns,
      },
    ];
  }
};

export default navbarLinks;
