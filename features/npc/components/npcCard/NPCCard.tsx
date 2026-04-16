import { INpc } from "../../types/INpc";

interface NPCCardProps {
  npc: INpc;
}

const NPCCard = ({ npc }: NPCCardProps) => {
  return (
    <article className="bg-sidebar rounded-md p-5">
      <h3 className="text-lg font-semibold">{npc.name}</h3>
      <p className="text-muted-foreground text-sm">{npc.role}</p>
      <p className="mt-2 text-sm">{npc.description}</p>
      {npc.personality ? (
        <p className="text-muted-foreground mt-2 text-sm">{npc.personality}</p>
      ) : null}
    </article>
  );
};

export default NPCCard;
