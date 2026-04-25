"use client";

import { useEffect, useState } from "react";
import NPCCard from "../npcCard/NPCCard";
import listNpcs from "../../actions/listNpcs";
import { INpc } from "../../types/INpc";
import { SkeletonBlock } from "@/shared/components/loading/Loading";

interface NpcListProps {
  campaignId: number;
}

const SKELETON_COUNT = 3;

const NpcList = ({ campaignId }: NpcListProps) => {
  const [npcs, setNpcs] = useState<INpc[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    listNpcs(campaignId).then((npcs) => {
      setNpcs(npcs);
      setIsLoading(false);
    });
  }, [campaignId]); // fix: dependência corrigida (listNpcs e setNpcs são estáveis)

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
