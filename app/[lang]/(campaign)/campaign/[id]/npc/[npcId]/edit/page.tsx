import getNpc from "@/features/npc/actions/getNpc";
import NPCEditForm from "@/features/npc/components/form/NPCEditForm";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Lang } from "@/shared/types/i18n";
import { Params } from "@/shared/types/params.type";

interface NPCEditProps {
  params: Promise<Params>;
}

const NPCEdit = async ({ params }: NPCEditProps) => {
  const { npcId, lang } = await params;
  const dict = await getDictionary(lang as Lang);

  const { data: npc } = await getNpc(Number(npcId));

  return <div>{npc && <NPCEditForm dict={dict} npc={npc} />}</div>;
};

export default NPCEdit;
