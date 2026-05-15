"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LoreEntrySchema,
  LoreEntrySchemaType,
} from "../../schemas/LoreEntrySchema";
import { Field, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Dictionary } from "@/shared/types/i18n";

interface LoreEntryFormProps {
  dict: Dictionary;
  onSubmit: (data: LoreEntrySchemaType) => Promise<void>;
  isSubmitting?: boolean;
}

const defaultValues: LoreEntrySchemaType = {
  name: "",
  type: "",
  era: "",
  source: "",
  description: "",
  additionalNotes: "",
};

const LoreEntryForm = ({
  dict,
  onSubmit,
  isSubmitting,
}: LoreEntryFormProps) => {
  const wb = dict.world_building.lore;

  const { register, handleSubmit, reset, formState } =
    useForm<LoreEntrySchemaType>({
      resolver: zodResolver(LoreEntrySchema),
      mode: "onChange",
      defaultValues,
    });

  const isDisabled = isSubmitting || !formState.isValid;

  const handleFormSubmit = async (data: LoreEntrySchemaType) => {
    await onSubmit(data);
    reset(defaultValues);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="bg-sidebar space-y-4 rounded-md p-5"
    >
      <FieldSet className="gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="lore-name">{wb.label_name}</FieldLabel>
            <Input
              id="lore-name"
              type="text"
              placeholder={wb.placeholder_name}
              {...register("name")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lore-type">{wb.label_type}</FieldLabel>
            <Input
              id="lore-type"
              type="text"
              placeholder={wb.placeholder_type}
              {...register("type")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="lore-era">{wb.label_era}</FieldLabel>
            <Input
              id="lore-era"
              type="text"
              placeholder={wb.placeholder_era}
              {...register("era")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="lore-source">{wb.label_source}</FieldLabel>
            <Input
              id="lore-source"
              type="text"
              placeholder={wb.placeholder_source}
              {...register("source")}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="lore-description">
            {wb.label_description}
          </FieldLabel>
          <Textarea
            id="lore-description"
            placeholder={wb.placeholder_description}
            rows={4}
            {...register("description")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="lore-notes">
            {wb.label_additional_notes}
          </FieldLabel>
          <Textarea
            id="lore-notes"
            placeholder={wb.placeholder_additional_notes}
            rows={3}
            {...register("additionalNotes")}
          />
        </Field>
      </FieldSet>

      <Button type="submit" className="w-full" disabled={isDisabled}>
        {wb.add_button}
      </Button>
    </form>
  );
};

export default LoreEntryForm;
