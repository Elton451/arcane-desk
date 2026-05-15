import { ProfilePage } from "@/features/profile/components";
import getProfileStats from "@/features/profile/actions/getProfileStats";
import { IUserDTO } from "@/shared/api/models/IUser";
import getUser from "@/shared/api/services/getUser";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Params } from "@/shared/types/params.type";
import { Lang } from "@/shared/types/i18n";

interface ProfileRouteProps {
  params: Promise<Params>;
}

const ProfileRoutePage = async ({ params }: ProfileRouteProps) => {
  const { lang } = await params;
  const dict = await getDictionary(lang as Lang);
  const dbUser = await getUser();
  const stats = await getProfileStats(dbUser.id);

  const user: IUserDTO = {
    id: dbUser.id,
    email: dbUser.email,
    name: dbUser.name,
    displayName: dbUser.displayName,
    image: dbUser.image,
  };

  return <ProfilePage dict={dict} user={user} stats={stats} />;
};

export default ProfileRoutePage;
