import type { LucideIcon } from "lucide-react";
import {
  FileText,
  FolderKanban,
  Globe,
  LayoutGrid,
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
): NavbarRoute[] => {
  const navbarDict = dict.navbar;

  if (isInCampaign) {
    return [
      {
        href: "/dashboard",
        label: navbarDict.dashboard,
        icon: LayoutGrid,
      },
      {
        href: "/session-review",
        label: navbarDict.session_review,
        icon: FileText,
      },
      {
        href: "/npc-creation",
        label: navbarDict.npc_creation,
        icon: UserRound,
      },
      {
        href: "/notes",
        label: navbarDict.notes,
        icon: NotebookText,
      },
      {
        href: "/world-building",
        label: navbarDict.world_building,
        icon: Globe,
      },
    ];
  }

  return [
    {
      href: "/campaigns",
      label: navbarDict.campaigns,
      icon: FolderKanban,
    },
  ];
};

export default navbarLinks;
