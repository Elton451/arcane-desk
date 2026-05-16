import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FolderKanban,
  Globe,
  NotebookText,
  UserRound,
} from "lucide-react";
import { Dictionary } from "@/shared/types/i18n";

export type NavbarRoute = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navbarLinks = (
  dict: Dictionary,
  isInCampaign: boolean,
  campaignId?: number,
): NavbarRoute[] => {
  const navbarDict = dict.navbar;

  if (isInCampaign && campaignId) {
    return [
      {
        href: `/campaign/${campaignId}/session`,
        label: navbarDict.session_review,
        icon: FileText,
      },
      {
        href: `/campaign/${campaignId}/npc`,
        label: navbarDict.npc,
        icon: UserRound,
      },
      {
        href: `/campaign/${campaignId}/notes`,
        label: navbarDict.notes,
        icon: NotebookText,
      },
      {
        href: `/campaign/${campaignId}/world-building`,
        label: navbarDict.world_building,
        icon: Globe,
      },
    ];
  }

  return [
    {
      href: "/",
      label: navbarDict.campaigns,
      icon: FolderKanban,
    },
  ];
};

export default navbarLinks;
