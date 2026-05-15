import SessionCreateForm from "@/features/session/components/form/SessionCreateForm";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Lang } from "@/shared/types/i18n";

interface CreateSessionPageProps {
  params: Promise<{ lang: Lang; id: string }>;
}

const CreateSessionPage = async ({ params }: CreateSessionPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className="pt-2">
      <SessionCreateForm dict={dict} campaignId={Number(id)} />
    </div>
  );
};

export default CreateSessionPage;
