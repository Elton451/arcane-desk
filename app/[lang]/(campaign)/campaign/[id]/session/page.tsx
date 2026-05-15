import { getSessionsByCampaignId } from "@/features/session/actions/getSessionsByCampaignId";
import { SessionList } from "@/features/session/components/sessionList/SessionList";
import { Button } from "@/shared/components/ui/button";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import Link from "next/link";

interface SessionPageProps {
  params: Promise<Params>;
}

const SessionPage = async ({ params }: SessionPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang);
  const { data: sessions } = await getSessionsByCampaignId(Number(id));

  return (
    <>
      <div className="mt-5 w-full text-center">
        <h2 className="mb-5 text-2xl font-bold">{dict.session.page_title}</h2>
        <Button asChild className="w-50">
          <Link href={`/${lang}/campaign/${id}/session/create`}>
            {dict.session.create_session}
          </Link>
        </Button>
      </div>
      <div className="px-10">
        <SessionList
          sessions={sessions}
          dict={dict}
          lang={lang}
          campaignId={Number(id)}
        />
      </div>
    </>
  );
};

export default SessionPage;
