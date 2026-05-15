"use client";

import DeleteEntryButton from "./DeleteEntryButton";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";
import type { ILocation } from "../../types/ILocation";

interface LocationCardProps {
  location: ILocation;
  dict: Dictionary;
  onDelete: (id: number) => void;
  isDeleting?: boolean;
}

const LocationCard = ({
  location,
  dict,
  onDelete,
  isDeleting,
}: LocationCardProps) => {
  const wb = dict.world_building.location;

  return (
    <article
      className={cn(
        "border-border bg-card group relative rounded-lg border px-5 py-4",
        isDeleting && "pointer-events-none opacity-50",
      )}
    >
      <DeleteEntryButton
        dict={dict}
        entryId={location.id}
        onDelete={onDelete}
        confirmTitle={wb.delete_confirm_title}
        confirmDescription={wb.delete_confirm}
        disabled={isDeleting}
      />

      <h3 className="text-accent pr-8 text-lg font-semibold">
        {location.name}
      </h3>
      <p className="text-muted-foreground text-sm">{location.type}</p>

      {location.description ? (
        <p className="mt-3 text-sm leading-relaxed whitespace-pre-wrap">
          {location.description}
        </p>
      ) : null}

      {location.population ? (
        <p className="text-muted-foreground mt-3 text-sm">
          {t(wb.card_population, { value: location.population })}
        </p>
      ) : null}

      {location.ruler ? (
        <p className="text-muted-foreground text-sm">
          {t(wb.card_ruler, { value: location.ruler })}
        </p>
      ) : null}

      {location.additionalNotes ? (
        <p className="text-muted-foreground mt-3 text-sm italic">
          {location.additionalNotes}
        </p>
      ) : null}
    </article>
  );
};

export default LocationCard;
