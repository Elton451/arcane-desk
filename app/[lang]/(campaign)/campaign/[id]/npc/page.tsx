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
    <div>
      <h2 className="text-2xl">{dict.npc.page_title}</h2>
      <Link href={`/campaign/${id}/npc/create`}>{dict.npc.create_npc}</Link>
    </div>
  );
};

export default NPCPage;
