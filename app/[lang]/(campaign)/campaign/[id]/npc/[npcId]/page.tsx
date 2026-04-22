import getNpc from "@/features/npc/actions/getNpc";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NpcDescription from "@/features/npc/components/NpcDescription/NpcDescription";

interface NpcDetailPageProps {
  params: Promise<Params>;
}

const NPCPage = async ({ params }: NpcDetailPageProps) => {
  const { lang, npcId, id: campaignId } = await params;
  const dict = await getDictionary(lang);
  const result = await getNpc(Number(npcId));

  if (!result.success || !result.data) {
    notFound();
  }

  const npc = result.data;

  const initials = npc.name
    .split(" ")
    .slice(0, 2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        href={`/${lang}/npcs`}
        className="text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ChevronLeftIcon className="size-4" />
        {dict.npc.back_to_npcs}
      </Link>

      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-primary/20 text-primary flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-medium">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-medium">{npc.name}</h1>
            <p className="text-muted-foreground text-sm">{npc.role}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {/* npc.race && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {npc.race}
                </span>
              ) */}
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/${lang}/campaign/${campaignId}/npc/${npcId}/edit`}
            className="border-border hover:bg-secondary rounded-md border px-3 py-1.5 text-sm transition-colors"
          >
            {dict.common.edit}
          </Link>
          {/* TODO: wire up delete action */}
          <button className="border-destructive/40 text-destructive hover:bg-destructive/10 rounded-md border px-3 py-1.5 text-sm transition-colors">
            {dict.common.delete}
          </button>
        </div>
      </div>

      {/* Description */}
      {npc.description && (
        <NpcDescription
          description={npc.description}
          labelCollapse={dict.npc.hide_description}
          labelExpand={dict.npc.show_description}
        />
      )}

      {/* Stats grid */}
      <div className="mb-4 grid grid-cols-3 gap-4">
        {[
          { label: dict.npc.race, value: "RAÇA" },
          { label: dict.npc.role, value: npc.role },
        ].map(({ label, value }) =>
          value ? (
            <div
              key={label}
              className="border-border bg-card rounded-lg border p-4"
            >
              <p className="text-muted-foreground mb-1 text-xs tracking-wider uppercase">
                {label}
              </p>
              <p className="text-sm">{value}</p>
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};

export default NPCPage;
