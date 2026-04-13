"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createNPC from "../actions/createNPC";
import NPCForm from "./NPCForm";
import { NpcSchemaType } from "../schemas/NpcSchema";
import { Dictionary } from "@/shared/types/i18n";
import { t } from "@/shared/i18n/interpolate";

interface NPCCreateFormProps {
  dict: Dictionary;
  campaignId: number;
}

const NPCCreateForm = ({ dict, campaignId }: NPCCreateFormProps) => {
  const router = useRouter();

  const handleSubmit = async (formData: NpcSchemaType) => {
    const mutation = await createNPC(campaignId, formData);
    if (mutation?.success && mutation.data) {
      toast(
        t(dict.npc.npc_created_successfully, {
          name: mutation.data.name,
        }),
      );
      router.push(`/campaign/${campaignId}/npc`);
      router.refresh();
    } else {
      toast(dict.npc.error_creating_npc);
    }
  };

  return <NPCForm dict={dict} handleSubmit={handleSubmit} />;
};

export default NPCCreateForm;
