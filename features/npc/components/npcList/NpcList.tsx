"use client";

import { useCallback, useEffect, useState } from "react";
import NPCCard from "../npcCard/NPCCard";
import listNpcs from "../../actions/listNpcs";
import { INpc } from "../../types/INpc";
import { SkeletonBlock } from "@/shared/components/loading/Loading";
import { toast } from "sonner";
import { Dictionary } from "@/shared/types/i18n";

interface NpcListProps {
  campaignId: number;
  dict: Dictionary;
}

const SKELETON_COUNT = 3;

const NpcList = ({ campaignId, dict }: NpcListProps) => {
  const [npcs, setNpcs] = useState<INpc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNpcs = useCallback(async () => {
    try {
      setIsLoading(true);
      const npcs = await listNpcs(campaignId);
      setNpcs(npcs);
      setIsLoading(false);
    } catch (error) {
      console.error("error while loading NPCs", error);
      toast(dict.npc.error_loading);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId]);

  useEffect(() => {
    loadNpcs();
  }, [loadNpcs]); // fix: dependência corrigida (listNpcs e setNpcs são estáveis)

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <li key={i} className="list-none">
                <SkeletonBlock layout="card" />
              </li>
            ))
          : npcs.map((npc) => (
              <li key={npc.id} className="list-none">
                <NPCCard npc={npc} />
              </li>
            ))}
      </ul>
    </div>
  );
};

export default NpcList;
