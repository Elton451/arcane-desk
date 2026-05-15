import getNpc from "@/features/npc/actions/getNpc";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import NpcDescription from "@/features/npc/components/NpcDescription/NpcDescription";
import getInitials from "@/shared/utils/getInitials.utils";
import NpcDelete from "@/features/npc/components/form/NPCDelete";
import { Lang } from "@/shared/types/i18n";

interface NpcDetailPageProps {
  params: Promise<Params>;
}

const NPCPage = async ({ params }: NpcDetailPageProps) => {
  const { lang, npcId, id: campaignId } = await params;
  const dict = await getDictionary(lang as Lang);
  const result = await getNpc(Number(npcId));

  if (!result.success || !result.data) {
    notFound();
  }

  const npc = result.data;

  const initials = getInitials(npc.name);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Link
        href={`/${lang}/campaign/${campaignId}/npc`}
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
          </div>
        </div>

        <div className="flex gap-2">
          <Link
            href={`/${lang}/campaign/${campaignId}/npc/${npcId}/edit`}
            className="border-border hover:bg-secondary rounded-md border px-3 py-1.5 text-sm transition-colors"
          >
            {dict.common.edit}
          </Link>
          <NpcDelete
            dict={dict}
            npcId={Number(npcId)}
            redirectUrl={`/${lang}/campaign/${campaignId}/npc`}
          />
        </div>
      </div>

      {npc.description && (
        <NpcDescription
          description={npc.description}
          labelCollapse={dict.npc.hide_description}
          labelExpand={dict.npc.show_description}
        />
      )}

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
