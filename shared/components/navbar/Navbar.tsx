"use client";
import { Dictionary } from "@/shared/types/i18n";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import navbarLinks from "./navbarLinks";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { ArrowLeft, LogOutIcon } from "lucide-react";
import { Button } from "../ui/button";
import UserAvatar from "../userAvatar/UserAvatar";
import { IUserDTO } from "@/shared/api/models/IUser";
import { cn } from "@/lib/utils";

interface NavbarProps {
  campaignId?: number;
  campaignName?: string;
  dict: Dictionary;
  user: IUserDTO | null;
}

const Navbar = ({ campaignId, campaignName, dict, user }: NavbarProps) => {
  const navbarDict = dict.navbar;
  const isInCampaign = campaignId && campaignName;
  const pathname = usePathname();
  const params = useParams();
  const lang =
    typeof params.lang === "string" ? params.lang : (params.lang?.[0] ?? "en");

  const pathForMatch =
    pathname.replace(new RegExp(`^/${lang}(?=/|$)`), "") || "/";
  const isRouteActive = (href: string) =>
    pathForMatch === href || pathForMatch.startsWith(`${href}/`);

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="flex">
          <h1 className="font-spectral text-xl">Arcane Desk</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {<UserAvatar dict={dict} user={user} />}

        {isInCampaign && (
          <div className="border-b">
            <div className="mb-3 px-3">
              <p className="text-text-muted mb-1 text-xs font-semibold tracking-widest uppercase">
                {navbarDict.current_campaign}
              </p>
              <p className="text-accent-text font-mono text-sm leading-snug font-semibold">
                {campaignName}
              </p>
              <Button
                className="flex w-full items-center gap-3 rounded-full px-3 py-2.5 font-mono text-sm transition-colors"
                variant="ghost"
              >
                <Link
                  href="/campaigns"
                  className="text-text-secondary hover:text-accent-text inline-flex items-center gap-1 text-xs transition-colors duration-150"
                >
                  <ArrowLeft className="h-3 w-3" />
                  {navbarDict.change_campaign}
                </Link>
              </Button>
            </div>
          </div>
        )}

        <nav className="flex flex-col gap-1 px-2">
          {navbarLinks(dict, Boolean(isInCampaign)).map((route) => {
            const href = `/${lang}${route.href}`;
            const active = isRouteActive(route.href);
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={href}
                className={cn(
                  "flex items-center gap-3 rounded-full px-3 py-2.5 font-mono text-sm transition-colors",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                <Icon
                  aria-hidden
                  className="size-[1.125rem] shrink-0 opacity-90"
                />
                {route.label}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter>
        <Button
          variant="ghost"
          className="flex items-center gap-3 rounded-full px-3 py-2.5 font-mono text-sm transition-colors"
        >
          <LogOutIcon />
          <a target="_blank" href="/auth/logout">
            Deslogar
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
