"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import createFaction from "../actions/createFaction";
import createLocation from "../actions/createLocation";
import createLoreEntry from "../actions/createLoreEntry";
import deleteFaction from "../actions/deleteFaction";
import deleteLocation from "../actions/deleteLocation";
import deleteLoreEntry from "../actions/deleteLoreEntry";
import listFactions from "../actions/listFactions";
import listLocations from "../actions/listLocations";
import listLoreEntries from "../actions/listLoreEntries";
import { FactionSchemaType } from "../schemas/FactionSchema";
import { LocationSchemaType } from "../schemas/LocationSchema";
import { LoreEntrySchemaType } from "../schemas/LoreEntrySchema";
import type { IFaction } from "../types/IFaction";
import type { ILocation } from "../types/ILocation";
import type { ILoreEntry } from "../types/ILoreEntry";
import {
  parseWorldBuildingTab,
  WorldBuildingTab,
} from "../types/WorldBuildingTab";
import FactionCard from "./card/FactionCard";
import LocationCard from "./card/LocationCard";
import LoreEntryCard from "./card/LoreEntryCard";
import FactionForm from "./form/FactionForm";
import LocationForm from "./form/LocationForm";
import LoreEntryForm from "./form/LoreEntryForm";
import EntityGrid from "./list/EntityGrid";
import WorldBuildingTabs from "./tabs/WorldBuildingTabs";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";

interface WorldBuildingPageProps {
  dict: Dictionary;
  campaignId: number;
}

const WorldBuildingPage = ({ dict, campaignId }: WorldBuildingPageProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeTab = parseWorldBuildingTab(searchParams.get("tab"));

  const [locations, setLocations] = useState<ILocation[]>([]);
  const [factions, setFactions] = useState<IFaction[]>([]);
  const [loreEntries, setLoreEntries] = useState<ILoreEntry[]>([]);

  const [loadingTabs, setLoadingTabs] = useState<Set<WorldBuildingTab>>(
    () => new Set([activeTab]),
  );
  const [loadedTabs, setLoadedTabs] = useState<Set<WorldBuildingTab>>(
    new Set(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const [visitedTabs, setVisitedTabs] = useState<Set<WorldBuildingTab>>(
    () => new Set([activeTab]),
  );

  const setTabLoading = useCallback(
    (tab: WorldBuildingTab, loading: boolean) => {
      setLoadingTabs((current) => {
        const next = new Set(current);
        if (loading) {
          next.add(tab);
        } else {
          next.delete(tab);
        }
        return next;
      });
    },
    [],
  );

  const fetchTab = useCallback(
    async (tab: WorldBuildingTab) => {
      setTabLoading(tab, true);
      try {
        if (tab === "locations") {
          setLocations(await listLocations(campaignId));
        } else if (tab === "factions") {
          setFactions(await listFactions(campaignId));
        } else {
          setLoreEntries(await listLoreEntries(campaignId));
        }
        setLoadedTabs((current) => new Set(current).add(tab));
      } catch {
        toast(dict.world_building.error_loading);
      } finally {
        setTabLoading(tab, false);
      }
    },
    [campaignId, dict.world_building.error_loading, setTabLoading],
  );

  useEffect(() => {
    setVisitedTabs((current) => new Set(current).add(activeTab));
  }, [activeTab]);

  useEffect(() => {
    if (!visitedTabs.has(activeTab)) {
      return;
    }
    if (!loadedTabs.has(activeTab)) {
      fetchTab(activeTab);
    }
  }, [activeTab, visitedTabs, loadedTabs, fetchTab]);

  const handleTabChange = (tab: WorldBuildingTab) => {
    setVisitedTabs((current) => new Set(current).add(tab));
    const params = new URLSearchParams(searchParams.toString());
    if (tab === "locations") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const handleCreateLocation = async (formData: LocationSchemaType) => {
    setIsSubmitting(true);
    const result = await createLocation(campaignId, formData);
    setIsSubmitting(false);

    if (result.success && result.data) {
      setLocations((current) => [result.data, ...current]);
      toast(
        t(dict.world_building.location.created_successfully, {
          name: result.data.name,
        }),
      );
      return;
    }

    toast(dict.world_building.error_creating);
  };

  const handleCreateFaction = async (formData: FactionSchemaType) => {
    setIsSubmitting(true);
    const result = await createFaction(campaignId, formData);
    setIsSubmitting(false);

    if (result.success && result.data) {
      setFactions((current) => [result.data, ...current]);
      toast(
        t(dict.world_building.faction.created_successfully, {
          name: result.data.name,
        }),
      );
      return;
    }

    toast(dict.world_building.error_creating);
  };

  const handleCreateLoreEntry = async (formData: LoreEntrySchemaType) => {
    setIsSubmitting(true);
    const result = await createLoreEntry(campaignId, formData);
    setIsSubmitting(false);

    if (result.success && result.data) {
      setLoreEntries((current) => [result.data, ...current]);
      toast(
        t(dict.world_building.lore.created_successfully, {
          name: result.data.name,
        }),
      );
      return;
    }

    toast(dict.world_building.error_creating);
  };

  const handleDeleteLocation = async (locationId: number) => {
    const previous = locations;
    setDeletingIds((current) => new Set(current).add(locationId));
    setLocations((current) =>
      current.filter((location) => location.id !== locationId),
    );

    const result = await deleteLocation(locationId);
    setDeletingIds((current) => {
      const next = new Set(current);
      next.delete(locationId);
      return next;
    });

    if (result.success) {
      toast(dict.world_building.deleted_successfully);
      return;
    }

    setLocations(previous);
    toast(dict.world_building.error_deleting);
  };

  const handleDeleteFaction = async (factionId: number) => {
    const previous = factions;
    setDeletingIds((current) => new Set(current).add(factionId));
    setFactions((current) =>
      current.filter((faction) => faction.id !== factionId),
    );

    const result = await deleteFaction(factionId);
    setDeletingIds((current) => {
      const next = new Set(current);
      next.delete(factionId);
      return next;
    });

    if (result.success) {
      toast(dict.world_building.deleted_successfully);
      return;
    }

    setFactions(previous);
    toast(dict.world_building.error_deleting);
  };

  const handleDeleteLoreEntry = async (entryId: number) => {
    const previous = loreEntries;
    setDeletingIds((current) => new Set(current).add(entryId));
    setLoreEntries((current) =>
      current.filter((entry) => entry.id !== entryId),
    );

    const result = await deleteLoreEntry(entryId);
    setDeletingIds((current) => {
      const next = new Set(current);
      next.delete(entryId);
      return next;
    });

    if (result.success) {
      toast(dict.world_building.deleted_successfully);
      return;
    }

    setLoreEntries(previous);
    toast(dict.world_building.error_deleting);
  };

  const isLocationsLoading = loadingTabs.has("locations");
  const isFactionsLoading = loadingTabs.has("factions");
  const isLoreLoading = loadingTabs.has("lore");

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <WorldBuildingTabs
        dict={dict}
        activeTab={activeTab}
        onTabChange={handleTabChange}
      />

      <div
        id="world-building-panel-locations"
        role="tabpanel"
        aria-labelledby="world-building-tab-locations"
        hidden={activeTab !== "locations"}
        className={activeTab !== "locations" ? "hidden" : "space-y-8"}
      >
        <LocationForm
          dict={dict}
          onSubmit={handleCreateLocation}
          isSubmitting={isSubmitting && activeTab === "locations"}
        />
        <EntityGrid
          isLoading={isLocationsLoading}
          isEmpty={!isLocationsLoading && locations.length === 0}
          emptyMessage={dict.world_building.location.empty_list}
        >
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              dict={dict}
              onDelete={handleDeleteLocation}
              isDeleting={deletingIds.has(location.id)}
            />
          ))}
        </EntityGrid>
      </div>

      <div
        id="world-building-panel-factions"
        role="tabpanel"
        aria-labelledby="world-building-tab-factions"
        hidden={activeTab !== "factions"}
        className={activeTab !== "factions" ? "hidden" : "space-y-8"}
      >
        <FactionForm
          dict={dict}
          onSubmit={handleCreateFaction}
          isSubmitting={isSubmitting && activeTab === "factions"}
        />
        <EntityGrid
          isLoading={isFactionsLoading}
          isEmpty={!isFactionsLoading && factions.length === 0}
          emptyMessage={dict.world_building.faction.empty_list}
        >
          {factions.map((faction) => (
            <FactionCard
              key={faction.id}
              faction={faction}
              dict={dict}
              onDelete={handleDeleteFaction}
              isDeleting={deletingIds.has(faction.id)}
            />
          ))}
        </EntityGrid>
      </div>

      <div
        id="world-building-panel-lore"
        role="tabpanel"
        aria-labelledby="world-building-tab-lore"
        hidden={activeTab !== "lore"}
        className={activeTab !== "lore" ? "hidden" : "space-y-8"}
      >
        <LoreEntryForm
          dict={dict}
          onSubmit={handleCreateLoreEntry}
          isSubmitting={isSubmitting && activeTab === "lore"}
        />
        <EntityGrid
          isLoading={isLoreLoading}
          isEmpty={!isLoreLoading && loreEntries.length === 0}
          emptyMessage={dict.world_building.lore.empty_list}
        >
          {loreEntries.map((entry) => (
            <LoreEntryCard
              key={entry.id}
              entry={entry}
              dict={dict}
              onDelete={handleDeleteLoreEntry}
              isDeleting={deletingIds.has(entry.id)}
            />
          ))}
        </EntityGrid>
      </div>
    </div>
  );
};

export default WorldBuildingPage;
