"use client";

import DeleteEntryButton from "./DeleteEntryButton";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";
import type { IFaction } from "../../types/IFaction";

interface FactionCardProps {
  faction: IFaction;
  dict: Dictionary;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const FactionCard = ({
  faction,
  dict,
  onDelete,
  isDeleting,
}: FactionCardProps) => {
  const wb = dict.world_building.faction;

  return (
    <article
      className={cn(
        "border-border bg-card group relative rounded-lg border px-5 py-4",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      <DeleteEntryButton
        dict={dict}
        entryId={faction.id}
        onDelete={onDelete}
        confirmTitle={wb.delete_confirm_title}
        confirmDescription={wb.delete_confirm}
        disabled={isDeleting}
      />

      <h3 className="text-accent pr-8 text-lg font-semibold">{faction.name}</h3>
      <p className="text-muted-foreground text-sm">{faction.type}</p>

      {faction.description ? (
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
          {faction.description}
        </p>
      ) : null}

      {faction.leader ? (
        <p className="text-muted-foreground mt-3 text-sm">
          {t(wb.card_leader, { value: faction.leader })}
        </p>
      ) : null}

      {faction.goals ? (
        <p className="text-muted-foreground text-sm">
          {t(wb.card_goals, { value: faction.goals })}
        </p>
      ) : null}

      {faction.additionalNotes ? (
        <p className="text-muted-foreground mt-3 text-sm italic">
          {faction.additionalNotes}
        </p>
      ) : null}
    </article>
  );
};

export default FactionCard;
