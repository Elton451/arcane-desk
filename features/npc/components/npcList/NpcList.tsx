"use client";
import { useEffect, useState } from "react";
import NPCCard from "../npcCard/NPCCard";
import listNpcs from "../../actions/listNpcs";
import { INpc } from "../../types/INpc";

interface NpcListProps {
  campaignId: number;
}

const NpcList = ({ campaignId }: NpcListProps) => {
  const [npcs, setNpcs] = useState<INpc[]>([]);

  useEffect(() => {
    listNpcs(campaignId).then((npcs) => {
      setNpcs(npcs);
    });
  }, [setNpcs, listNpcs]);

  return (
    <div className="mt-8 flex w-full flex-col items-center gap-8">
      <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
        {npcs.map((npc) => (
          <li key={npc.id} className="list-none">
            <NPCCard npc={npc} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NpcList;
