import { Suspense } from "react";
import WorldBuildingPage from "@/features/world-building/components/WorldBuildingPage";
import { SkeletonBlock } from "@/shared/components/loading/Loading";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import { Lang } from "@/shared/types/i18n";

interface CampaignWorldBuildingPageProps {
  params: Promise<Params>;
}

const CampaignWorldBuildingPage = async ({
  params,
}: CampaignWorldBuildingPageProps) => {
  const { lang, id } = await params;
  const dict = await getDictionary(lang as Lang);

  return (
    <div className="px-6 py-8">
      <h2 className="mb-8 text-center text-2xl font-bold">
        {dict.world_building.page_title}
      </h2>
      <Suspense
        fallback={
          <div className="mx-auto max-w-6xl space-y-4">
            <SkeletonBlock layout="card" />
          </div>
        }
      >
        <WorldBuildingPage dict={dict} campaignId={Number(id)} />
      </Suspense>
    </div>
  );
};

export default CampaignWorldBuildingPage;
