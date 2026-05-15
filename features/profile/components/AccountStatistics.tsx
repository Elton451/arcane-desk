import { BarChart3 } from "lucide-react";
import { Dictionary } from "@/shared/types/i18n";
import { ProfileStats } from "../actions/getProfileStats";
import ProfileSection from "./ProfileSection";

interface AccountStatisticsProps {
  dict: Dictionary;
  stats: ProfileStats;
}

const AccountStatistics = ({ dict, stats }: AccountStatisticsProps) => {
  const profileDict = dict.profile;

  const items = [
    {
      value: stats.activeCampaigns,
      label: profileDict.stat_active_campaigns,
    },
    {
      value: stats.totalSessions,
      label: profileDict.stat_total_sessions,
    },
    {
      value: stats.npcsCreated,
      label: profileDict.stat_npcs_created,
    },
  ];

  return (
    <ProfileSection>
      <header className="mb-5 flex items-center gap-2">
        <BarChart3 aria-hidden className="text-muted-foreground size-4" />
        <h2 className="text-foreground text-base font-semibold">
          {profileDict.account_statistics}
        </h2>
      </header>

      <div className="grid grid-cols-3 gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="bg-muted/40 flex flex-col items-center justify-center rounded-lg px-2 py-4 text-center"
          >
            <p className="text-foreground text-2xl font-bold tabular-nums">
              {item.value}
            </p>
            <p className="text-muted-foreground mt-1 text-xs leading-snug">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </ProfileSection>
  );
};

export default AccountStatistics;
