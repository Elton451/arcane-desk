"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NoteSchema, NoteSchemaType } from "../../schemas/NoteSchema";
import { NOTE_CATEGORIES } from "../../types/NoteCategory";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import { categoryLabelKey } from "../../utils/categoryLabels";
import { TextEditor } from "@/shared/components/textEditor/Tiptap";
import type { INote } from "../../types/INote";

interface EditNoteFormProps {
  dict: Dictionary;
  note: INote;
  onSubmit: (data: NoteSchemaType) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const EditNoteForm = ({
  dict,
  note,
  onSubmit,
  onCancel,
  isSubmitting,
}: EditNoteFormProps) => {
  const { register, handleSubmit, control, formState } =
    useForm<NoteSchemaType>({
      resolver: zodResolver(NoteSchema),
      mode: "onChange",
      defaultValues: {
        title: note.title,
        content: note.content,
        category: note.category,
      },
    });

  const { errors } = formState;
  const isDisabled = isSubmitting || !formState.isValid || !formState.isDirty;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-sidebar space-y-4 rounded-md p-4"
    >
      <FieldSet className="gap-4">
        <Field>
          <FieldLabel htmlFor={`edit-note-title-${note.id}`}>
            {dict.note.label_title}
          </FieldLabel>
          <Input
            id={`edit-note-title-${note.id}`}
            type="text"
            placeholder={dict.note.placeholder_title}
            {...register("title")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={`edit-note-category-${note.id}`}>
            {dict.note.label_category}
          </FieldLabel>
          <select
            id={`edit-note-category-${note.id}`}
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

        <Field data-invalid={!!errors.content}>
          <FieldLabel htmlFor={`edit-note-content-${note.id}`}>
            {dict.note.label_content}
          </FieldLabel>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <TextEditor value={field.value} onChange={field.onChange} />
            )}
          />
          <FieldError errors={[errors.content]} />
        </Field>
      </FieldSet>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={isDisabled}>
          {isSubmitting ? dict.common.saving : dict.common.save}
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          {dict.common.cancel}
        </Button>
      </div>
    </form>
  );
};

export default EditNoteForm;
