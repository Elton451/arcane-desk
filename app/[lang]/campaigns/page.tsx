import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import {
  CampaignList,
  CreateCampaignModal,
} from "@/features/campaign/components";

interface CampaignPageProps {
  params: Promise<Params>;
}

const CampaignsPage = async ({ params }: CampaignPageProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang);
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

        <CreateCampaignModal dict={dict} />
        <CampaignList dict={dict} />
      </section>
    </main>
  );
};

export default CampaignsPage;
