export type ProfileThemeId =
  | "nord"
  | "dracula"
  | "kanagawa"
  | "catppuccin-mocha"
  | "gruvbox-dark"
  | "tokyo-night"
  | "one-dark"
  | "solarized-dark";

export interface ProfileTheme {
  id: ProfileThemeId;
  labelKey:
    | "nord"
    | "dracula"
    | "kanagawa"
    | "catppuccin_mocha"
    | "gruvbox_dark"
    | "tokyo_night"
    | "one_dark_pro"
    | "solarized_dark";
  swatches: [string, string, string, string];
  cardBackground: string;
}

export const PROFILE_THEMES: ProfileTheme[] = [
  {
    id: "nord",
    labelKey: "nord",
    swatches: ["#2E3440", "#3B4252", "#88C0D0", "#BF616A"],
    cardBackground: "#3b4252",
  },
  {
    id: "dracula",
    labelKey: "dracula",
    swatches: ["#282a36", "#bd93f9", "#8be9fd", "#ff5555"],
    cardBackground: "#282a36",
  },
  {
    id: "kanagawa",
    labelKey: "kanagawa",
    swatches: ["#1f1f28", "#7e9cd8", "#c0a36e", "#c34043"],
    cardBackground: "#1f1f28",
  },
  {
    id: "catppuccin-mocha",
    labelKey: "catppuccin_mocha",
    swatches: ["#1e1e2e", "#cba6f7", "#94e2d5", "#f38ba8"],
    cardBackground: "#1e1e2e",
  },
  {
    id: "gruvbox-dark",
    labelKey: "gruvbox_dark",
    swatches: ["#282828", "#fe8019", "#8ec07c", "#fb4934"],
    cardBackground: "#282828",
  },
  {
    id: "tokyo-night",
    labelKey: "tokyo_night",
    swatches: ["#1a1b26", "#7aa2f7", "#bb9af7", "#f7768e"],
    cardBackground: "#1a1b26",
  },
  {
    id: "one-dark",
    labelKey: "one_dark_pro",
    swatches: ["#282c34", "#61afef", "#c678dd", "#e06c75"],
    cardBackground: "#282c34",
  },
  {
    id: "solarized-dark",
    labelKey: "solarized_dark",
    swatches: ["#002b36", "#268bd2", "#2aa198", "#dc322f"],
    cardBackground: "#002b36",
  },
];

export const DEFAULT_PROFILE_THEME: ProfileThemeId = "nord";

export const THEME_STORAGE_KEY = "arcane-desk-theme";
