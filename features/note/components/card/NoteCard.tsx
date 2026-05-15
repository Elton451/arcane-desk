"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import type { INote } from "../../types/INote";
import { CATEGORY_BADGE_CLASSES } from "../../utils/categoryStyles";
import { categoryLabelKey } from "../../utils/categoryLabels";

interface NoteCardProps {
  note: INote;
  dict: Dictionary;
  onDelete: (id: number) => void;
}

const NoteCard = ({ note, dict, onDelete }: NoteCardProps) => {
  return (
    <article className="border-border bg-card group relative rounded-lg border px-5 py-4">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-destructive absolute top-3 right-3 size-7 opacity-0 transition-opacity group-hover:opacity-100"
            aria-label={dict.common.delete}
          >
            <Trash2 className="size-3.5" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {dict.note.delete_confirm_title}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {dict.note.delete_confirm}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{dict.common.cancel}</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => onDelete(note.id)}
            >
              {dict.common.delete}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h3 className="pr-8 text-base font-bold">{note.title}</h3>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span
          className={cn(
            "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
            CATEGORY_BADGE_CLASSES[note.category],
          )}
        >
          {dict.note.categories[categoryLabelKey(note.category)]}
        </span>
        <time
          dateTime={note.date.toISOString()}
          className="text-muted-foreground text-xs"
        >
          {format(note.date, "yyyy-MM-dd")}
        </time>
      </div>

      <p className="text-muted-foreground mt-3 text-sm leading-relaxed whitespace-pre-wrap">
        {note.content}
      </p>
    </article>
  );
};

export default NoteCard;
