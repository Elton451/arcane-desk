"use client";

import DeleteEntryButton from "./DeleteEntryButton";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";
import type { ILoreEntry } from "../../types/ILoreEntry";

interface LoreEntryCardProps {
  entry: ILoreEntry;
  dict: Dictionary;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const LoreEntryCard = ({
  entry,
  dict,
  onDelete,
  isDeleting,
}: LoreEntryCardProps) => {
  const wb = dict.world_building.lore;

  return (
    <article
      className={cn(
        "border-border bg-card group relative rounded-lg border px-5 py-4",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      <DeleteEntryButton
        dict={dict}
        entryId={entry.id}
        onDelete={onDelete}
        confirmTitle={wb.delete_confirm_title}
        confirmDescription={wb.delete_confirm}
        disabled={isDeleting}
      />

      <h3 className="text-accent pr-8 text-lg font-semibold">{entry.name}</h3>
      <p className="text-muted-foreground text-sm">{entry.type}</p>

      {entry.description ? (
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
          {entry.description}
        </p>
      ) : null}

      {entry.era ? (
        <p className="text-muted-foreground mt-3 text-sm">
          {t(wb.card_era, { value: entry.era })}
        </p>
      ) : null}

      {entry.source ? (
        <p className="text-muted-foreground text-sm">
          {t(wb.card_source, { value: entry.source })}
        </p>
      ) : null}

      {entry.additionalNotes ? (
        <p className="text-muted-foreground mt-3 text-sm italic">
          {entry.additionalNotes}
        </p>
      ) : null}
    </article>
  );
};

export default LoreEntryCard;
