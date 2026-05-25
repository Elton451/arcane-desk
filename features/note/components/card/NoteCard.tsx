"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
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
import { NoteSchemaType } from "../../schemas/NoteSchema";
import EditNoteForm from "../form/EditNoteForm";
import parse from "html-react-parser";

interface NoteCardProps {
  note: INote;
  dict: Dictionary;
  onDelete: (id: number) => void;
  onEdit: (id: number, data: NoteSchemaType) => Promise<boolean>;
}

const NoteCard = ({ note, dict, onDelete, onEdit }: NoteCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEdit = async (data: NoteSchemaType) => {
    setIsSubmitting(true);
    const success = await onEdit(note.id, data);
    setIsSubmitting(false);
    if (success) setIsEditing(false);
  };

  if (isEditing) {
    return (
      <article className="border-border bg-card rounded-lg border px-5 py-4">
        <EditNoteForm
          dict={dict}
          note={note}
          onSubmit={handleEdit}
          onCancel={() => setIsEditing(false)}
          isSubmitting={isSubmitting}
        />
      </article>
    );
  }

  return (
    <article className="border-border bg-card group relative rounded-lg border px-5 py-4">
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-foreground size-7"
          aria-label={dict.common.edit}
          onClick={() => setIsEditing(true)}
        >
          <Pencil className="size-3.5" />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive size-7"
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
      </div>

      <h3 className="pr-16 text-base font-bold">{note.title}</h3>

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
        {parse(note.content)}
      </p>
    </article>
  );
};

export default NoteCard;
