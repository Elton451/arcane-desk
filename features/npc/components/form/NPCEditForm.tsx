"use client";

import { Npc } from "@/prisma/generated/prisma/client";
import { Dictionary } from "@/shared/types/i18n";
import NPCForm from "./NPCForm";
import { NpcSchemaType } from "../../schemas/NpcSchema";
import editNpc from "../../actions/editNpc";

interface NPCEditFormProps {
  dict: Dictionary;
  npc: Npc;
}

const NPCEditForm = ({ dict, npc }: NPCEditFormProps) => {
  const handleSubmit = async (formData: NpcSchemaType) => {
    editNpc(npc.id, formData);
  };

  return (
    <>
      <NPCForm dict={dict} npc={npc} handleSubmit={handleSubmit} />
    </>
  );
};

export default NPCEditForm;
