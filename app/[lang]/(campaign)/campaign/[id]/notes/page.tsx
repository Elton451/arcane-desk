import NotesPage from "@/features/note/components/NotesPage";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Lang } from "@/shared/types/i18n";
import { Params } from "@/shared/types/params.type";

interface CampaignNotesPageProps {
  params: Promise<Params>;
}

const CampaignNotesPage = async ({ params }: CampaignNotesPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang as Lang);

  return (
    <div className="px-6 py-8">
      <h2 className="mb-8 text-center text-2xl font-bold">
        {dict.note.page_title}
      </h2>
      <NotesPage dict={dict} campaignId={Number(id)} />
    </div>
  );
};

export default CampaignNotesPage;
