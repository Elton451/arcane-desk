import { UserRound } from "lucide-react";
import { IUserDTO } from "@/shared/api/models/IUser";
import { Dictionary } from "@/shared/types/i18n";
import { ProfileStats } from "../actions/getProfileStats";
import AccountStatistics from "./AccountStatistics";
import ProfileCard from "./ProfileCard";
import ThemeSelection from "./ThemeSelection";

interface ProfilePageProps {
  dict: Dictionary;
  user: IUserDTO;
  stats: ProfileStats;
}

const ProfilePage = ({ dict, user, stats }: ProfilePageProps) => {
  return (
    <main className="mx-auto flex w-full max-w-2xl flex-col gap-6 px-4 py-8 sm:px-6">
      <header className="flex items-center gap-3">
        <UserRound
          aria-hidden
          className="text-muted-foreground size-7 shrink-0"
        />
        <h1 className="text-foreground text-2xl font-semibold tracking-tight sm:text-3xl">
          {dict.profile.page_title}
        </h1>
      </header>

      <ProfileCard dict={dict} user={user} />
      <ThemeSelection dict={dict} />
      <AccountStatistics dict={dict} stats={stats} />
    </main>
  );
};

export default ProfilePage;
