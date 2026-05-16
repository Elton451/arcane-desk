import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import { CampaignList } from "@/features/campaign/components";
import { Lang } from "@/shared/types/i18n";

interface CampaignPageProps {
  params: Promise<Params>;
}

const CampaignsPage = async ({ params }: CampaignPageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);
  const campaignDict = dict.campaign;

  return (
    <main className="flex min-h-[calc(100dvh-4rem)] w-full py-5">
      <section className="mx-auto flex w-full max-w-3/4 flex-col items-center">
        <header className="space-y-1.5 text-center">
          <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
            {campaignDict.select_campaign}
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {campaignDict.select_campaign_description}
          </p>
        </header>

        <CampaignList dict={dict} />
      </section>
    </main>
  );
};

export default CampaignsPage;
