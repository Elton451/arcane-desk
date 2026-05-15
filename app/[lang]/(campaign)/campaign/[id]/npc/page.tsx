import NpcList from "@/features/npc/components/npcList/NpcList";
import { Button } from "@/shared/components/ui/button";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import Link from "next/link";

interface NPCPageProps {
  params: Promise<Params>;
}

const NPCPage = async ({ params }: NPCPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <div className="mt-5 w-full text-center">
        <h2 className="mb-5 text-2xl font-bold">{dict.npc.page_title}</h2>
        <Button asChild className="w-50">
          <Link href={`/campaign/${id}/npc/create`}>{dict.npc.create_npc}</Link>
        </Button>
      </div>
      <div className="px-10">
        <NpcList campaignId={Number(id)} />
      </div>
    </>
  );
};

export default NPCPage;
