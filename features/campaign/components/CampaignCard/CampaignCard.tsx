import Link from "next/link";
import { CalendarDays, CirclePlay, Clock3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";

type CampaignCardLabels = {
  createdAt: string;
  lastPlayedAt: string;
  continueCampaign: string;
};

interface CampaignCardProps {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  lastPlayedAt?: string;
  labels: CampaignCardLabels;
  className?: string;
}

const CampaignCard = ({
  id,
  name,
  description,
  createdAt,
  lastPlayedAt,
  labels,
  className,
}: CampaignCardProps) => {
  return (
    <article
      className={cn(
        "border-border/80 bg-card/90 h-full rounded-xl border p-5 shadow-[0_10px_28px_rgba(0,0,0,0.2)] transition-colors",
        "hover:border-accent/40",
        className,
      )}
    >
      <div className="space-y-3">
        <h2 className="text-accent max-w-[24ch] text-2xl leading-tight font-semibold tracking-tight">
          {name}
        </h2>

        <p className="text-foreground/90 min-h-14 max-w-[40ch] text-sm leading-relaxed">
          {description}
        </p>
      </div>

      <div className="bg-border/80 my-4 h-px" />

      <dl className="text-muted-foreground space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <dt>
            <CalendarDays className="size-4" />
          </dt>
          <dd>
            {labels.createdAt}: {createdAt.toLocaleDateString()}
          </dd>
        </div>
        <div className="flex items-center gap-2">
          <dt>
            <Clock3 className="size-4" />
          </dt>
          <dd>
            {labels.lastPlayedAt}: {lastPlayedAt ?? "-"}
          </dd>
        </div>
      </dl>

      <Button
        asChild
        variant="secondary"
        size="sm"
        className="border-border/80 bg-secondary/55 text-secondary-foreground hover:bg-secondary/80 mt-4 w-full border"
      >
        <Link href={`/campaign/${id}`}>
          <CirclePlay className="size-4" />
          {labels.continueCampaign}
        </Link>
      </Button>
    </article>
  );
};

export { CampaignCard };
