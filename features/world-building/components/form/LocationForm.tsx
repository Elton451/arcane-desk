"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  LocationSchema,
  LocationSchemaType,
} from "../../schemas/LocationSchema";
import { Field, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { Dictionary } from "@/shared/types/i18n";

interface LocationFormProps {
  dict: Dictionary;
  onSubmit: (data: LocationSchemaType) => Promise<void>;
  isSubmitting?: boolean;
}

const defaultValues: LocationSchemaType = {
  name: "",
  type: "",
  population: "",
  ruler: "",
  description: "",
  additionalNotes: "",
};

const LocationForm = ({ dict, onSubmit, isSubmitting }: LocationFormProps) => {
  const wb = dict.world_building.location;

  const { register, handleSubmit, reset, formState } =
    useForm<LocationSchemaType>({
      resolver: zodResolver(LocationSchema),
      mode: "onChange",
      defaultValues,
    });

  const isDisabled = isSubmitting || !formState.isValid;

  const handleFormSubmit = async (data: LocationSchemaType) => {
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
            <FieldLabel htmlFor="location-name">{wb.label_name}</FieldLabel>
            <Input
              id="location-name"
              type="text"
              placeholder={wb.placeholder_name}
              {...register("name")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="location-type">{wb.label_type}</FieldLabel>
            <Input
              id="location-type"
              type="text"
              placeholder={wb.placeholder_type}
              {...register("type")}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="location-population">
              {wb.label_population}
            </FieldLabel>
            <Input
              id="location-population"
              type="text"
              placeholder={wb.placeholder_population}
              {...register("population")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="location-ruler">{wb.label_ruler}</FieldLabel>
            <Input
              id="location-ruler"
              type="text"
              placeholder={wb.placeholder_ruler}
              {...register("ruler")}
            />
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="location-description">
            {wb.label_description}
          </FieldLabel>
          <Textarea
            id="location-description"
            placeholder={wb.placeholder_description}
            rows={4}
            {...register("description")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="location-notes">
            {wb.label_additional_notes}
          </FieldLabel>
          <Textarea
            id="location-notes"
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

export default LocationForm;
