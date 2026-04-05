"use client";
import { Dictionary } from "@/shared/types/i18n";
import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import navbarLinks from "./navbarLinks";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import UserAvatar from "../userAvatar/UserAvatar";

interface NavbarProps {
  campaignId?: number;
  campaignName?: string;
  dict: Dictionary;
}

const Navbar = ({ campaignId, campaignName, dict }: NavbarProps) => {
  const navbarDict = dict.navbar;
  const isInCampaign = campaignId && campaignName;

  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <div className="text-center">
          <h1 className="font-spectral text-xl">Arcane Desk</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {<UserAvatar dict={dict} />}
        {isInCampaign && (
          <>
            <div className="px-3 mb-3">
              <p className="text-xs uppercase tracking-widest font-semibold mb-1 text-text-muted">
                {navbarDict.current_campaign}
              </p>
              <p className="text-sm font-semibold leading-snug font-mono text-accent-text">
                {campaignName}
              </p>
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-1 text-xs mt-2 text-text-secondary hover:text-accent-text transition-colors duration-150"
              >
                <ArrowLeft className="w-3 h-3" />
                {navbarDict.change_campaign}
              </Link>
            </div>
          </>
        )}

        <div className="h-px mx-3 mb-3 bg-border" />

        <nav className="flex flex-col gap-1 px-2">
          {navbarLinks(dict, isInCampaign).map((route, index) => (
            <Button key={index}>{route.label}</Button>
          ))}
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default Navbar;
