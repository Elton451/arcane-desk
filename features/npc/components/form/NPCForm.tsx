"use client";
import { useForm } from "react-hook-form";
import { NpcSchema, NpcSchemaType } from "../../schemas/NpcSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldSet,
} from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Dictionary } from "@/shared/types/i18n";
import { INpc } from "../../types/INpc";
import { Button } from "@/shared/components/ui/button";
import { TextEditor } from "@/shared/components/textEditor/Tiptap";

interface NPCFormProps {
  dict: Dictionary;
  npc?: INpc;
  handleSubmit: (formData: NpcSchemaType) => void;
}

const NPCForm = ({ dict, npc, handleSubmit }: NPCFormProps) => {
  const {
    register,
    handleSubmit: formSubmit,
    formState: { errors },
  } = useForm<NpcSchemaType>({
    resolver: zodResolver(NpcSchema),
    defaultValues: npc
      ? {
          name: npc.name,
          description: npc.description,
          personality: npc.personality,
          role: npc.role,
        }
      : {},
  });

  return (
    <form
      className="bg-sidebar min-w-6xl rounded-md p-5"
      onSubmit={formSubmit(handleSubmit)}
    >
      <FieldSet className="mb-5">
        <Field data-invalid={!!errors.name}>
          <FieldLabel htmlFor="input-field-name">
            {dict.npc.label_name}
          </FieldLabel>
          <Input
            id="input-field-name"
            type="text"
            placeholder={dict.campaign.placeholder_name}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>
        <Field data-invalid={!!errors.role}>
          <FieldLabel htmlFor="input-field-role">Role</FieldLabel>
          <Input
            id="input-field-role"
            type="text"
            placeholder="Enter NPC role"
            {...register("role")}
          />
          <FieldError errors={[errors.role]} />
        </Field>
        <Field data-invalid={!!errors.description}>
          <FieldLabel htmlFor="input-field-description">
            {dict.npc.label_description}
          </FieldLabel>
          <Textarea
            id="input-field-description"
            placeholder={dict.npc.placeholder_description}
            {...register("description")}
          />

          <TextEditor defaultText={dict.npc.placeholder_description} />
          <FieldError errors={[errors.description]} />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-field-personality">Personality</FieldLabel>
          <Textarea
            id="input-field-personality"
            placeholder={dict.npc.placeholder_personality}
            {...register("personality")}
          />
        </Field>
      </FieldSet>
      <div className="w-full">
        <Button className="w-full" type="submit">
          {dict.npc.create_npc}
        </Button>
      </div>
    </form>
  );
};

export default NPCForm;
