"use client";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { NOTE_CATEGORIES, NoteFilterValue } from "../../types/NoteCategory";
import { categoryLabelKey } from "../../utils/categoryLabels";

interface NoteFilterBarProps {
  dict: Dictionary;
  activeFilter: NoteFilterValue;
  onFilterChange: (filter: NoteFilterValue) => void;
}

const NoteFilterBar = ({
  dict,
  activeFilter,
  onFilterChange,
}: NoteFilterBarProps) => {
  const filters: { value: NoteFilterValue; label: string }[] = [
    { value: "ALL", label: dict.note.filter_all },
    ...NOTE_CATEGORIES.map((category) => ({
      value: category,
      label: dict.note.categories[categoryLabelKey(category)],
    })),
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ value, label }) => (
        <Button
          key={value}
          type="button"
          size="sm"
          variant={activeFilter === value ? "default" : "outline"}
          className={cn("rounded-full", activeFilter === value && "shadow-sm")}
          onClick={() => onFilterChange(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default NoteFilterBar;
