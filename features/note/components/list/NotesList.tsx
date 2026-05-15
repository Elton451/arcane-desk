"use client";

import { SkeletonBlock } from "@/shared/components/loading/Loading";
import { Dictionary } from "@/shared/types/i18n";
import type { INote } from "../../types/INote";
import NoteCard from "../card/NoteCard";

interface NotesListProps {
  notes: INote[];
  dict: Dictionary;
  isLoading: boolean;
  emptyMessage: string;
  onDelete: (id: number) => void;
}

const SKELETON_COUNT = 3;

const NotesList = ({
  notes,
  dict,
  isLoading,
  emptyMessage,
  onDelete,
}: NotesListProps) => {
  if (isLoading) {
    return (
      <ul className="max-h-[32rem] space-y-3 overflow-y-auto pr-1">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <li key={i} className="list-none">
            <SkeletonBlock layout="card" />
          </li>
        ))}
      </ul>
    );
  }

  if (notes.length === 0) {
    return (
      <p className="text-muted-foreground border-border bg-card rounded-lg border border-dashed px-6 py-10 text-center text-sm">
        {emptyMessage}
      </p>
    );
  }

  return (
    <ul className="max-h-[32rem] space-y-3 overflow-y-auto pr-1">
      {notes.map((note) => (
        <li key={note.id} className="list-none">
          <NoteCard note={note} dict={dict} onDelete={onDelete} />
        </li>
      ))}
    </ul>
  );
};

export default NotesList;
