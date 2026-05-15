"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FactionSchema, FactionSchemaType } from "../../schemas/FactionSchema";
import { Field, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Dictionary } from "@/shared/types/i18n";

interface FactionFormProps {
  dict: Dictionary;
  onSubmit: (data: FactionSchemaType) => Promise<void>;
  isSubmitting?: boolean;
}

const defaultValues: FactionSchemaType = {
  name: "",
  type: "",
  leader: "",
  goals: "",
  description: "",
  additionalNotes: "",
};

const FactionForm = ({ dict, onSubmit, isSubmitting }: FactionFormProps) => {
  const wb = dict.world_building.faction;

  const { register, handleSubmit, reset, formState } =
    useForm<FactionSchemaType>({
      resolver: zodResolver(FactionSchema),
      mode: "onChange",
      defaultValues,
    });

  const isDisabled = isSubmitting || !formState.isValid;

  const handleFormSubmit = async (data: FactionSchemaType) => {
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
            <FieldLabel htmlFor="faction-name">{wb.label_name}</FieldLabel>
            <Input
              id="faction-name"
              type="text"
              placeholder={wb.placeholder_name}
              {...register("name")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="faction-type">{wb.label_type}</FieldLabel>
            <Input
              id="faction-type"
              type="text"
              placeholder={wb.placeholder_type}
              {...register("type")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="faction-leader">{wb.label_leader}</FieldLabel>
            <Input
              id="faction-leader"
              type="text"
              placeholder={wb.placeholder_leader}
              {...register("leader")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="faction-goals">{wb.label_goals}</FieldLabel>
            <Input
              id="faction-goals"
              type="text"
              placeholder={wb.placeholder_goals}
              {...register("goals")}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="faction-description">
            {wb.label_description}
          </FieldLabel>
          <Textarea
            id="faction-description"
            placeholder={wb.placeholder_description}
            rows={4}
            {...register("description")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="faction-notes">
            {wb.label_additional_notes}
          </FieldLabel>
          <Textarea
            id="faction-notes"
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

export default FactionForm;
