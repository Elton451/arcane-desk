"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Dictionary } from "@/shared/types/i18n";
import CampaignForm from "../CampaignForm/CampaignForm";
import { Plus } from "lucide-react";
import createCampaign from "../../actions/campaign";
import { CampaignFormType } from "../../schemas/CampaignFormSchema";
import { useState } from "react";
import { toast } from "sonner";
import { t } from "@/shared/i18n/interpolate";

interface CreateCampaignModalProps {
  dict: Dictionary;
}

const CreateCampaignModal = ({ dict }: CreateCampaignModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: CampaignFormType) => {
    const mutation = await createCampaign(formData);
    if (mutation?.success && mutation.data) {
      setIsOpen(false);
      toast(
        t(dict.campaign.campaign_created_successfully, {
          name: mutation.data?.name,
        }),
      );
    } else {
      toast(dict.campaign.error_creating_campaign);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-accent/40 bg-accent/70 text-primary hover:bg-accent/80 mt-6 px-4 shadow-xs"
        >
          <Plus className="size-4" />
          {dict.campaign.create_new_campaign}
        </Button>
      </DialogTrigger>
      <DialogContent className="backdrop-opacity-85">
        <DialogHeader>
          <DialogTitle>{dict.campaign.form_dialog_title}</DialogTitle>
          <DialogDescription>
            {dict.campaign.form_dialog_subtitle}
          </DialogDescription>
        </DialogHeader>

        <CampaignForm dict={dict} handleSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;
