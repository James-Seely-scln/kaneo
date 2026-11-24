import { ShortcutKeys } from "@/components/shortcuts/shortcut-keys";
import { useTranslation } from "react-i18next";
import type { SettingsBreadcrumb } from "@/components/settings/nav/get-settings-breadcrumb";

import { Breadcrumbs, Tooltip } from "@blueprintjs/core";
import { SidebarTrigger } from "../ui/sidebar";

type SettingsHeaderProps = {
  breadcrumb: SettingsBreadcrumb | null;
};

export function SettingsHeader({ breadcrumb }: SettingsHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="flex h-10 shrink-0 items-center gap-1 border-b border-border bg-card p-2">
      <Tooltip
        content={
          <>
            {t("navigation:settingsLayout.toggleSidebar")}
            <ShortcutKeys id="toggleSidebar" />
          </>
        }
        placement="bottom" >
        <SidebarTrigger className="-ml-1 h-6 w-6" />
      </Tooltip>
      <div className="mx-1.5 h-4 w-px shrink-0 bg-border/80" />
      <Breadcrumbs
        items={[
          { text: t("navigation:page.settingsTitle") },
          { text: breadcrumb?.page },
        ]}
      />
    </header>
  );
}
