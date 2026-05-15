"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema, NoteSchemaType } from "../../schemas/NoteSchema";
import {
  DEFAULT_NOTE_CATEGORY,
  NOTE_CATEGORIES,
} from "../../types/NoteCategory";
import { Field, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { categoryLabelKey } from "../../utils/categoryLabels";

interface NewNoteFormProps {
  dict: Dictionary;
  onSubmit: (data: NoteSchemaType) => Promise<void>;
  isSubmitting?: boolean;
}

const NewNoteForm = ({ dict, onSubmit, isSubmitting }: NewNoteFormProps) => {
  const { register, handleSubmit, reset, formState } = useForm<NoteSchemaType>({
    resolver: zodResolver(NoteSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      category: DEFAULT_NOTE_CATEGORY,
    },
  });

  const isDisabled = isSubmitting || !formState.isValid;

  const handleFormSubmit = async (data: NoteSchemaType) => {
    await onSubmit(data);
    reset({
      title: "",
      content: "",
      category: DEFAULT_NOTE_CATEGORY,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-sidebar space-y-4 rounded-md p-5"
    >
      <FieldSet className="gap-4">
        <Field>
          <FieldLabel htmlFor="note-title">{dict.note.label_title}</FieldLabel>
          <Input
            id="note-title"
            type="text"
            placeholder={dict.note.placeholder_title}
            {...register("title")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="note-category">
            {dict.note.label_category}
          </FieldLabel>
          <select
            id="note-category"
            className={cn(
              "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-2.5 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-3 md:text-sm",
            )}
            {...register("category")}
          >
            {NOTE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {dict.note.categories[categoryLabelKey(category)]}
              </option>
            ))}
          </select>
        </Field>

        <Field>
          <FieldLabel htmlFor="note-content">
            {dict.note.label_content}
          </FieldLabel>
          <Textarea
            id="note-content"
            placeholder={dict.note.placeholder_content}
            rows={5}
            {...register("content")}
          />
        </Field>
      </FieldSet>

      <Button type="submit" className="w-full" disabled={isDisabled}>
        {dict.note.add_note}
      </Button>
    </form>
  );
};

export default NewNoteForm;
