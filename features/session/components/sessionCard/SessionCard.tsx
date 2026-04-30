"use client";

import { useState } from "react";
import {
  Calendar,
  Users,
  Trash2,
  ChevronDown,
  ChevronUp,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/shared/components/ui/button";
import { CampaignSession } from "@/prisma/generated/prisma/browser";
import { Dictionary } from "@/shared/types/i18n";

type SessionCardProps = {
  session: CampaignSession;
  dict: Dictionary;
  onDeleteAction?: (id: number) => void;
  onEditAction?: (id: number) => void;
};

type SectionProps = {
  emoji: string;
  label: string;
  color?: string;
  content: string;
};

function Section({ label, content }: SectionProps) {
  return (
    <div className="space-y-1">
      <p className={cn("flex items-center gap-1.5 font-semibold")}>{label}</p>
      <p className="text-muted-foreground text-sm leading-relaxed">{content}</p>
    </div>
  );
}

export function SessionCard({
  session,
  onDeleteAction,
  onEditAction,
  dict,
}: SessionCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasDetails =
    session.sessionSummary ||
    session.highlights ||
    session.improvements ||
    session.notes;

  return (
    <div
      className={cn(
        "group border-border bg-card relative rounded-lg border",
        "transition-all duration-200",
        "hover:border-border/80 hover:shadow-[0_0_0_1px_hsl(var(--border)/0.4)]",
      )}
    >
      <div className="px-5 py-4 pl-6">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-primary truncate text-base font-semibold">
                {session.title}
              </h3>
            </div>

            {/* Meta row */}
            <div className="text-muted-foreground mt-1.5 flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5">
                <Calendar className="size-3.5 shrink-0" />
                {session.date.toString()}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="size-3.5 shrink-0" />
                {session.numberOfPlayers}{" "}
                {session.numberOfPlayers === 1
                  ? dict.session.player
                  : dict.session.players}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {onEditAction && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-foreground size-7"
                onClick={() => onEditAction(session.id)}
                aria-label="Edit session"
              >
                <Pencil className="size-3.5" />
              </Button>
            )}
            {onDeleteAction && (
              <Button
                variant="ghost"
                size="icon"
                className="text-muted-foreground hover:text-destructive size-7"
                onClick={() => onDeleteAction(session.id)}
                aria-label="Delete session"
              >
                <Trash2 className="size-3.5" />
              </Button>
            )}
          </div>
        </div>

        {/* Expandable details */}
        {hasDetails && (
          <>
            {expanded && (
              <div className="border-border/50 mt-4 space-y-3.5 border-t pt-4">
                {session.sessionSummary && (
                  <Section
                    emoji=""
                    label={dict.session.summary}
                    content={session.sessionSummary}
                  />
                )}
                {session.highlights && (
                  <Section
                    emoji=""
                    label={dict.session.highlights}
                    color="text-accent"
                    content={session.highlights}
                  />
                )}
                {session.improvements && (
                  <Section
                    emoji=""
                    label={dict.session.challenges}
                    color="text-yellow-400"
                    content={session.improvements}
                  />
                )}
                {session.notes && (
                  <Section
                    emoji=""
                    label={dict.session.notes}
                    color="text-primary"
                    content={session.notes}
                  />
                )}
              </div>
            )}

            <button
              onClick={() => setExpanded((v) => !v)}
              className={cn(
                "text-muted-foreground mt-3 flex items-center gap-1 text-xs",
                "hover:text-foreground transition-colors",
              )}
            >
              {expanded ? (
                <>
                  <ChevronUp className="size-3.5" /> {dict.session.hide_details}
                </>
              ) : (
                <>
                  <ChevronDown className="size-3.5" />{" "}
                  {dict.session.show_details}
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
