"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Dictionary } from "@/shared/types/i18n";
import { SessionSchema, SessionSchemaType } from "../../schemas/SessionSchema";

interface SessionFormProps {
  dict: Dictionary;
  handleSubmit: (formData: SessionSchemaType) => void;
}

const SessionForm = ({ dict, handleSubmit }: SessionFormProps) => {
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<SessionSchemaType>({
    resolver: zodResolver(SessionSchema),
    defaultValues: {
      date: "",
      numberOfPlayers: 1,
    },
  });

  return (
    <form
      className="bg-sidebar min-w-6xl rounded-md p-5"
      onSubmit={formSubmit(handleSubmit)}
    >
      <FieldSet className="mb-5">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Field data-invalid={!!errors.title}>
            <FieldLabel htmlFor="input-field-title">
              {dict.session.label_title}
            </FieldLabel>
            <Input
              id="input-field-title"
              type="text"
              placeholder={dict.session.placeholder_title}
              {...register("title")}
            />
            <FieldError errors={[errors.title]} />
          </Field>

          <Field data-invalid={!!errors.date}>
            <FieldLabel htmlFor="input-field-date">
              {dict.session.label_date}
            </FieldLabel>
            <Input id="input-field-date" type="date" {...register("date")} />
            <FieldError errors={[errors.date]} />
          </Field>

          <Field data-invalid={!!errors.numberOfPlayers}>
            <FieldLabel htmlFor="input-field-players">
              {dict.session.label_number_of_players}
            </FieldLabel>
            <Input
              id="input-field-players"
              type="number"
              min={1}
              {...register("numberOfPlayers")}
            />
            <FieldError errors={[errors.numberOfPlayers]} />
          </Field>
        </div>

        <Field data-invalid={!!errors.sessionSummary}>
          <FieldLabel htmlFor="input-field-summary">
            {dict.session.label_summary}
          </FieldLabel>
          <Textarea
            id="input-field-summary"
            placeholder={dict.session.placeholder_summary}
            {...register("sessionSummary")}
          />
          <FieldError errors={[errors.sessionSummary]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-highlights">
            {dict.session.label_highlights}
          </FieldLabel>
          <Textarea
            id="input-field-highlights"
            placeholder={dict.session.placeholder_highlights}
            {...register("highlights")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-improvements">
            {dict.session.label_improvements}
          </FieldLabel>
          <Textarea
            id="input-field-improvements"
            placeholder={dict.session.placeholder_improvements}
            {...register("improvements")}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="input-field-notes">
            {dict.session.label_notes}
          </FieldLabel>
          <Textarea
            id="input-field-notes"
            placeholder={dict.session.placeholder_notes}
            {...register("notes")}
          />
        </Field>
      </FieldSet>

      <div className="w-full">
        <Button className="w-full" type="submit">
          {dict.session.save_session_review}
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
