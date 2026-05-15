import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";
import { IUserDTO } from "@/shared/api/models/IUser";
import Navbar from "@/shared/components/navbar/Navbar";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { Lang } from "@/shared/types/i18n";

const CampaignLayout = async ({
  children,
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
  children: React.ReactNode;
}) => {
  const { lang, id } = await params;
  const safeLang = lang as Lang;

  const dict = await getDictionary(safeLang);
  const session = await auth0.getSession();

  let currentUser: IUserDTO | null = null;
  let campaignName: string | null = null;

  if (id) {
    const dbCampaign = await prisma.campaign.findUnique({
      where: { id: Number(id) },
    });

    if (dbCampaign?.name) {
      campaignName = dbCampaign.name;
    }
  }

  if (session?.user?.sub) {
    const dbUser = await prisma.user.findUnique({
      where: { auth0Id: session.user.sub },
    });

    if (dbUser) {
      currentUser = {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        displayName: dbUser.displayName,
        image: dbUser.image,
      };
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="w-full flex-1">
        <Navbar
          dict={dict}
          campaignName={campaignName || ""}
          user={currentUser}
          campaignId={Number(id)}
        />
        {children}
      </main>
    </div>
  );
};

export default CampaignLayout;
