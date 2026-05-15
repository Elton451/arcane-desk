"use client";
import { ICampaign } from "@/shared/api/models/ICampaign";
import { Field, FieldLabel, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Dictionary } from "@/shared/types/i18n";
import { useForm } from "react-hook-form";
import {
  CampaignFormSchema,
  CampaignFormType,
} from "../../schemas/CampaignFormSchema";
import { Textarea } from "@/shared/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/shared/components/ui/button";

interface CampaignFormProps {
  campaign?: ICampaign;
  handleSubmit: (formData: CampaignFormType) => void;
  dict: Dictionary;
}

const CampaignForm = ({ campaign, handleSubmit, dict }: CampaignFormProps) => {
  const { register, handleSubmit: formSubmit } = useForm<CampaignFormType>({
    resolver: zodResolver(CampaignFormSchema),
    defaultValues: campaign
      ? {
          name: campaign.name,
          description: campaign.description,
        }
      : {},
  });

  return (
    <form onSubmit={formSubmit(handleSubmit)}>
      <FieldSet className="mb-5">
        <Field>
          <FieldLabel htmlFor="input-field-name">
            {dict.campaign.label_name}
          </FieldLabel>
          <Input
            id="input-field-name"
            type="text"
            placeholder={dict.campaign.placeholder_name}
            {...register("name")}
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="input-field-description">
            {dict.campaign.label_description}
          </FieldLabel>
          <Textarea
            id="input-field-description"
            placeholder={dict.campaign.placeholder_description}
            {...register("description")}
          />
        </Field>
      </FieldSet>
      <div className="flex justify-end">
        <Button type="submit">{dict.campaign.create_new_campaign}</Button>
      </div>
    </form>
  );
};

export default CampaignForm;
