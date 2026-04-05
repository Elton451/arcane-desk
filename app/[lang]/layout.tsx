import AuthProvider from "@/features/auth/components/AuthProvider";
import { lato, spectral } from "@shared/assets/fonts";
import "./globals.css";
import Navbar from "@/shared/components/navbar/Navbar";
import { SidebarProvider } from "@/shared/components/ui/sidebar";
import { Params } from "@/shared/types/params.type";
import { getDictionary } from "@/shared/i18n/dictionaries";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<Params>;
}>) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <html
      lang="en"
      className={`h-full antialiased ${lato.variable} ${spectral.variable}`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <SidebarProvider>
            <Navbar dict={dict} campaignId={5} campaignName={"Kintargo"} />
            {children}
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
