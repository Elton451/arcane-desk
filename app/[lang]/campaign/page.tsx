import Link from "next/link";
import { CalendarDays, CirclePlay, Clock3, Plus } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { ICampaign } from "@/shared/api/models/ICampaign";
import { getDictionary, Locale } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";

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

        <Button
          variant="outline"
          size="sm"
          className="border-accent/40 bg-accent/70 text-accent-foreground hover:bg-accent/80 mt-6 px-4 shadow-xs"
        >
          <Plus className="size-4" />
          {campaignDict.create_new_campaign}
        </Button>

        <ul className="mt-8 grid w-full grid-cols-1 gap-5 md:grid-cols-3">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="list-none">
              <article
                className={cn(
                  "border-border/80 bg-card/90 h-full rounded-xl border p-5 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-colors",
                  "hover:border-accent/40",
                )}
              >
                <div className="space-y-3">
                  <h2 className="text-accent max-w-[24ch] text-2xl leading-tight font-semibold tracking-tight">
                    {campaign.name}
                  </h2>

                  <p className="text-foreground/90 min-h-14 max-w-[40ch] text-sm leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                <div className="bg-border/80 my-4 h-px" />

                <dl className="text-muted-foreground space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <dt>
                      <CalendarDays className="size-4" />
                    </dt>
                    <dd>
                      {campaignDict.created_at}: {campaign.createdAt.toString()}
                    </dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <dt>
                      <Clock3 className="size-4" />
                    </dt>
                    <dd>
                      {campaignDict.last_played_at}:{" "}
                      {/* campaign.lastPlayedAt */}
                    </dd>
                  </div>
                </dl>

                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="border-border/80 bg-secondary/55 text-secondary-foreground hover:bg-secondary/80 mt-4 w-full border"
                >
                  <Link href={`/campaign/${campaign.id}`}>
                    <CirclePlay className="size-4" />
                    {campaignDict.continue_campaign}
                  </Link>
                </Button>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default CampaignsPage;
