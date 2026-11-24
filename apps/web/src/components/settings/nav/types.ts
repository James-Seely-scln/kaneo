import type { LucideIcon } from "lucide-react";

type SettingsNavSubLink = {
  id: string;
  label: string;
  to: string;
};

type SettingsNavLink = SettingsNavSubLink & {
  icon: LucideIcon;
};

export type SettingsNavGroup = {
  id: string;
  label: string;
  links: SettingsNavLink[];
};

export type SettingsNavProject = {
  id: string;
  name: string;
  icon: LucideIcon;
  links: SettingsNavSubLink[];
};

export type SettingsNav = {
  account: SettingsNavGroup;
  workspace: SettingsNavGroup;
  projects: SettingsNavProject[];
  admin: SettingsNavGroup | null;
};
