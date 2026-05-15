import NPCCreateForm from "@/features/npc/components/form/NPCCreateForm";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Lang } from "@/shared/types/i18n";

interface CreateNPCPageProps {
  params: Promise<{ lang: string; id: string }>;
}

const CreateNPCPage = async ({ params }: CreateNPCPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang as Lang);

  return (
    <div className="pt-2">
      <NPCCreateForm dict={dict} campaignId={Number(id)} />
    </div>
  );
};

export default CreateNPCPage;
