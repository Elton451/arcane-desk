"use client";

import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dictionary } from "@/shared/types/i18n";
import {
  DEFAULT_PROFILE_THEME,
  PROFILE_THEMES,
  ProfileThemeId,
} from "@/shared/constants/profileThemes";
import ProfileSection from "./ProfileSection";

interface ThemeSelectionProps {
  dict: Dictionary;
}

const ThemeSelection = ({ dict }: ThemeSelectionProps) => {
  const profileDict = dict.profile;
  const [selectedTheme, setSelectedTheme] = useState<ProfileThemeId>(() => {
    const stored = (document.cookie
      .split("; ")
      .find((row) => row.startsWith("theme="))
      ?.split("=")[1] ?? null) as ProfileThemeId | null;

    return stored && PROFILE_THEMES.some((theme) => theme.id === stored)
      ? stored
      : DEFAULT_PROFILE_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", selectedTheme);
    document.cookie = `theme=${selectedTheme}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
  }, [selectedTheme]);

  const handleSelect = (themeId: ProfileThemeId) => {
    setSelectedTheme(themeId);
  };

  return (
    <ProfileSection>
      <header className="mb-5 flex items-center gap-2">
        <Palette aria-hidden className="text-muted-foreground size-4" />
        <h2 className="text-foreground text-base font-semibold">
          {profileDict.theme_selection}
        </h2>
      </header>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {PROFILE_THEMES.map((theme) => {
          const isSelected = selectedTheme === theme.id;
          const label = profileDict.themes[theme.labelKey];

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => handleSelect(theme.id)}
              className={cn(
                "relative rounded-lg border p-3 text-left transition-colors",
                "hover:border-primary/50 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                isSelected
                  ? "border-primary/70 ring-primary/30 ring-1"
                  : "border-border/60",
              )}
              style={{ backgroundColor: theme.cardBackground }}
              aria-pressed={isSelected}
              aria-label={label}
            >
              {isSelected && (
                <span
                  className="bg-primary text-primary-foreground absolute top-2 right-2 flex size-5 items-center justify-center rounded-full"
                  aria-hidden
                >
                  <Check className="size-3" />
                </span>
              )}

              <p className="text-foreground/95 mb-3 text-sm font-medium">
                {label}
              </p>

              <div className="flex gap-1.5">
                {theme.swatches.map((color) => (
                  <span
                    key={color}
                    className="size-5 shrink-0 rounded-full border border-white/10"
                    style={{ backgroundColor: color }}
                    aria-hidden
                  />
                ))}
              </div>
            </button>
          );
        })}
      </div>
    </ProfileSection>
  );
};

export default ThemeSelection;
