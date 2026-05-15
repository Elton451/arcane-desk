import { lato, spectral } from "@shared/assets/fonts";
import "./globals.css";
import Navbar from "@/shared/components/navbar/Navbar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Params } from "@/shared/types/params.type";
import { getDictionary } from "@/shared/i18n/dictionaries";
import { auth0 } from "@/lib/auth0";
import { prisma } from "@/lib/prisma";
import { IUserDTO } from "@/shared/api/models/IUser";
import { Toaster } from "sonner";
import ThemeInitializer from "@/shared/components/ThemeInitializer";
import { cookies } from "next/headers";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) {
  const { lang } = await params;
  const session = await auth0.getSession();
  const dict = await getDictionary(lang);
  const { get } = await cookies();

  const theme = get("theme")?.value || "kanagawa";

  let currentUser: IUserDTO | null = null;

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
        username: dbUser.username,
      };
    }
  }

  return (
    <html
      lang="en"
      className={`h-full antialiased ${lato.variable} ${spectral.variable}`}
      data-theme={theme}
    >
      <body className="flex min-h-full flex-col">
        <SidebarProvider>
          <Navbar user={currentUser} dict={dict} />
          {children}
          <Toaster />
        </SidebarProvider>
      </body>
    </html>
  );
}
