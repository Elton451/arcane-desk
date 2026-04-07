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
import { ArrowLeft, LogOutIcon, Sparkles } from "lucide-react";
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
      {/* ── Header ── */}
      <SidebarHeader className="px-5 py-5">
        <div className="flex items-center gap-2">
          <Sparkles aria-hidden className="text-primary size-5 shrink-0" />
          <div>
            <h1 className="font-spectral text-foreground text-lg leading-tight">
              Arcane Desk
            </h1>
            <span className="font-lato text-muted-foreground text-xs">
              {navbarDict.subtitle}
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="gap-0 px-3">
        <div className="mb-2">
          <UserAvatar dict={dict} user={user} />
        </div>

        {isInCampaign && (
          <div className="border-sidebar-border mb-3 border-b pb-3">
            <p className="text-muted-foreground mb-1 px-2 text-xs font-semibold tracking-widest uppercase">
              {navbarDict.current_campaign}
            </p>
            <p className="text-primary font-spectral px-2 text-sm leading-snug font-semibold">
              {campaignName}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground mt-1 h-7 w-full justify-start gap-1.5 rounded-md px-2 text-xs"
              asChild
            >
              <Link href="/campaigns">
                <ArrowLeft aria-hidden className="size-3 shrink-0" />
                {navbarDict.change_campaign}
              </Link>
            </Button>
          </div>
        )}

        <nav className="flex flex-col gap-0.5">
          {navbarLinks(dict, Boolean(isInCampaign)).map((route) => {
            const href = `/${lang}${route.href}`;
            const active = isRouteActive(route.href);
            const Icon = route.icon;
            return (
              <Link
                key={route.href}
                href={href}
                className={cn(
                  "font-lato flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors duration-150",
                  active
                    ? "bg-sidebar-primary text-sidebar-primary-foreground font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <Icon aria-hidden className="size-4 shrink-0" />
                {route.label}
              </Link>
            );
          })}
        </nav>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4">
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground hover:text-foreground w-full justify-start gap-3 rounded-md px-3 py-2.5 text-sm"
          asChild
        >
          <a target="_blank" href="/auth/logout">
            <LogOutIcon aria-hidden className="size-4 shrink-0" />
            {navbarDict.logout}
          </a>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Navbar;
