import getSession from "@/features/session/actions/getSession";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface SessionDetailPageProps {
  params: Promise<{
    lang: "en" | "pt-BR";
    id: string;
    sessionId: string;
  }>;
}

const SessionDetailPage = async ({ params }: SessionDetailPageProps) => {
  const { lang, id: campaignId, sessionId } = await params;
  const dict = await getDictionary(lang);
  const result = await getSession(Number(sessionId));

  if (!result.success || !result.data) {
    notFound();
  }

  const session = result.data;

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        href={`/${lang}/campaign/${campaignId}/session`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ChevronLeftIcon className="size-4" />
        {dict.session.back_to_sessions}
      </Link>

      <div className="border-border bg-card rounded-lg border p-5">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-medium">{session.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              {new Date(session.date).toLocaleDateString(lang)} -{" "}
              {session.numberOfPlayers}{" "}
              {session.numberOfPlayers === 1
                ? dict.session.player
                : dict.session.players}
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <section>
            <h2 className="text-sm font-semibold">{dict.session.summary}</h2>
            <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
              {session.sessionSummary}
            </p>
          </section>

          {session.highlights && (
            <section>
              <h2 className="text-sm font-semibold">
                {dict.session.highlights}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                {session.highlights}
              </p>
            </section>
          )}

          {session.improvements && (
            <section>
              <h2 className="text-sm font-semibold">
                {dict.session.challenges}
              </h2>
              <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                {session.improvements}
              </p>
            </section>
          )}

          {session.notes && (
            <section>
              <h2 className="text-sm font-semibold">{dict.session.notes}</h2>
              <p className="text-muted-foreground mt-1 text-sm whitespace-pre-wrap">
                {session.notes}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default SessionDetailPage;
