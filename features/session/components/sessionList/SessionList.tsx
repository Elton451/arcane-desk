"use client";

import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Dictionary, Lang } from "@/shared/types/i18n";
import { CampaignSession } from "@/prisma/generated/prisma/browser";
import { SessionCard } from "../sessionCard/SessionCard";
import { LoadingSection } from "@/shared/components/loading/Loading";

type SessionListProps = {
  sessions: CampaignSession[];
  dict: Dictionary;
  lang?: Lang;
  campaignId?: number;
  campaignTitle?: string;
  isLoading?: boolean;
  onAddSessionAction?: () => void;
  onDeleteSessionAction?: (id: number) => void;
  onEditSessionAction?: (id: number) => void;
};

export function SessionList({
  sessions,
  dict,
  lang,
  campaignId,
  campaignTitle,
  isLoading = false,
  onAddSessionAction,
  onDeleteSessionAction,
  onEditSessionAction,
}: SessionListProps) {
  return (
    <section className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-foreground text-lg font-semibold">
            {campaignTitle
              ? `${campaignTitle} — ${dict.session.sessions}`
              : dict.session.sessions}
          </h2>
        </div>

        {onAddSessionAction && (
          <Button
            size="sm"
            onClick={onAddSessionAction}
            className="shrink-0 gap-1.5"
          >
            <Plus className="size-4" />
            {dict.session.create_session}
          </Button>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <LoadingSection />
      ) : (
        <div className="space-y-2.5">
          {sessions.map((session) => (
            <SessionCard
              key={session.id}
              session={session}
              dict={dict}
              detailsHref={
                lang && campaignId
                  ? `/${lang}/campaign/${campaignId}/session/${session.id}`
                  : undefined
              }
              onDeleteAction={onDeleteSessionAction}
              onEditAction={onEditSessionAction}
            />
          ))}
        </div>
      )}
    </section>
  );
}
