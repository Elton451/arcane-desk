"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import createNote from "../actions/createNote";
import deleteNote from "../actions/deleteNote";
import listNotes from "../actions/listNotes";
import { NoteSchemaType } from "../schemas/NoteSchema";
import type { INote } from "../types/INote";
import { NoteFilterValue } from "../types/NoteCategory";
import NewNoteForm from "./form/NewNoteForm";
import NoteFilterBar from "./filter/NoteFilterBar";
import NotesList from "./list/NotesList";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";

interface NotesPageProps {
  dict: Dictionary;
  campaignId: number;
}

const NotesPage = ({ dict, campaignId }: NotesPageProps) => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeFilter, setActiveFilter] = useState<NoteFilterValue>("ALL");

  const loadNotes = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listNotes(campaignId);
      setNotes(data);
    } catch {
      toast(dict.note.error_loading);
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, dict.note.error_loading]);

  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const filteredNotes = useMemo(() => {
    if (activeFilter === "ALL") {
      return notes;
    }
    return notes.filter((note) => note.category === activeFilter);
  }, [notes, activeFilter]);

  const emptyMessage = useMemo(() => {
    if (notes.length === 0) {
      return dict.note.empty_list;
    }
    return dict.note.empty_filtered;
  }, [notes.length, dict.note.empty_list, dict.note.empty_filtered]);

  const handleCreate = async (formData: NoteSchemaType) => {
    setIsSubmitting(true);
    const result = await createNote(campaignId, formData);
    setIsSubmitting(false);

    if (result.success && result.data) {
      setNotes((current) => [result.data, ...current]);
      toast(
        t(dict.note.note_created_successfully, { title: result.data.title }),
      );
      return;
    }

    toast(dict.note.error_creating);
  };

  const handleDelete = async (noteId: number) => {
    const result = await deleteNote(noteId);

    if (result.success) {
      setNotes((current) => current.filter((note) => note.id !== noteId));
      toast(dict.note.deleted_successfully);
      return;
    }

    toast(dict.note.error_deleting);
  };

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
      <NewNoteForm
        dict={dict}
        onSubmit={handleCreate}
        isSubmitting={isSubmitting}
      />

      <section className="space-y-4">
        <NoteFilterBar
          dict={dict}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <NotesList
          notes={filteredNotes}
          dict={dict}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          onDelete={handleDelete}
        />
      </section>
    </div>
  );
};

export default NotesPage;
