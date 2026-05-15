"use client";

import { Book, MapPin, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { WorldBuildingTab } from "../../types/WorldBuildingTab";

interface WorldBuildingTabsProps {
  dict: Dictionary;
  activeTab: WorldBuildingTab;
  onTabChange: (tab: WorldBuildingTab) => void;
}

const TAB_CONFIG: {
  id: WorldBuildingTab;
  icon: typeof MapPin;
}[] = [
  { id: "locations", icon: MapPin },
  { id: "factions", icon: Shield },
  { id: "lore", icon: Book },
];

const WorldBuildingTabs = ({
  dict,
  activeTab,
  onTabChange,
}: WorldBuildingTabsProps) => {
  const labels: Record<WorldBuildingTab, string> = {
    locations: dict.world_building.tabs.locations,
    factions: dict.world_building.tabs.factions,
    lore: dict.world_building.tabs.lore,
  };

  return (
    <div
      className="border-border bg-card flex flex-wrap gap-1 rounded-lg border p-1"
      role="tablist"
      aria-label={dict.world_building.page_title}
    >
      {TAB_CONFIG.map(({ id, icon: Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`world-building-panel-${id}`}
            id={`world-building-tab-${id}`}
            className={cn(
              "flex flex-1 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-sidebar text-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
            onClick={() => onTabChange(id)}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {labels[id]}
          </button>
        );
      })}
    </div>
  );
};

export default WorldBuildingTabs;
