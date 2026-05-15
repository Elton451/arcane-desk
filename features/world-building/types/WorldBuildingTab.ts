export const WORLD_BUILDING_TABS = ["locations", "factions", "lore"] as const;

export type WorldBuildingTab = (typeof WORLD_BUILDING_TABS)[number];

export const DEFAULT_WORLD_BUILDING_TAB: WorldBuildingTab = "locations";

export function parseWorldBuildingTab(value: string | null): WorldBuildingTab {
  if (value && WORLD_BUILDING_TABS.includes(value as WorldBuildingTab)) {
    return value as WorldBuildingTab;
  }
  return DEFAULT_WORLD_BUILDING_TAB;
}
