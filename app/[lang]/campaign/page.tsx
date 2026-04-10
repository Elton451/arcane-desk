import { CampaignCard } from "@/features/campaign/components/CampaignCard";
import { ICampaign } from "@/shared/api/models/ICampaign";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import CreateCampaignModal from "@/features/campaign/components/CampaignCreateModal/CampaignCreateModal";

const campaigns: ICampaign[] = [
  {
    id: 1,
    name: "Dragons of the Eternal Flame",
    description:
      "A high fantasy campaign where heroes must stop an ancient dragon cult from resurrecting the Fire God.",
    createdAt: new Date("2026-01-15"),
    ownerId: "1",
    owner: {
      displayName: "Elton",
      email: "elton@mail.com",
      id: "1",
      name: "Elton",
      username: "elton",
      image: "",
    },
  },
  {
    id: 2,
    name: "Shadows Over Waterdeep",
    description: "Urban intrigue and mystery in the City of Splendors.",
    createdAt: new Date("2025-11-20"),
    ownerId: "1",
    owner: {
      displayName: "Elton",
      email: "elton@mail.com",
      id: "1",
      name: "Elton",
      username: "elton",
      image: "",
    },
  },
  {
    id: 3,
    name: "Dragons of the Eternal Flame",
    description:
      "A high fantasy campaign where heroes must stop an ancient dragon cult from resurrecting the Fire God.",
    createdAt: new Date("2026-01-15"),
    ownerId: "1",
    owner: {
      displayName: "Elton",
      email: "elton@mail.com",
      id: "1",
      name: "Elton",
      username: "elton",
      image: "",
    },
  },
  {
    id: 4,
    name: "Dragons of the Eternal Flame",
    description:
      "A high fantasy campaign where heroes must stop an ancient dragon cult from resurrecting the Fire God.",
    createdAt: new Date("2026-01-15"),
    ownerId: "1",
    owner: {
      displayName: "Elton",
      email: "elton@mail.com",
      id: "1",
      name: "Elton",
      username: "elton",
      image: "",
    },
  },
];

interface CampaignPageProps {
  params: Params;
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

        <ul className="mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="list-none">
              <CampaignCard
                id={campaign.id}
                name={campaign.name}
                description={campaign.description ?? ""}
                createdAt={campaign.createdAt}
                labels={{
                  createdAt: campaignDict.created_at,
                  lastPlayedAt: campaignDict.last_played_at,
                  continueCampaign: campaignDict.continue_campaign,
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CampaignsPage;
