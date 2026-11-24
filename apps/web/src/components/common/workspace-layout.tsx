import { ShortcutKeys } from "@/components/shortcuts/shortcut-keys";
import { useNavigate } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Layout from "@/components/common/layout";
import { SidebarTrigger } from "@/components/ui/sidebar";
import useActiveWorkspace from "@/hooks/queries/workspace/use-active-workspace";
import { cn } from "@/lib/cn";
import {
  Breadcrumbs,
  Tooltip,
  type BreadcrumbProps,
} from "@blueprintjs/core";

type WorkspaceLayoutProps = {
  title: string;
  headerActions?: ReactNode;
  children: ReactNode;
  onCreateProject?: () => void;
  className?: string;
};

export default function WorkspaceLayout({
  title,
  headerActions,
  children,
  className,
}: WorkspaceLayoutProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: workspace } = useActiveWorkspace();

  const items: BreadcrumbProps[] = [
    ...(workspace?.name
      ? [
        {
          text: workspace.name,
          href: `/dashboard/workspace/${workspace.id}`,
          onClick: (e: MouseEvent<HTMLElement>) => {
            e.preventDefault();
            navigate({
              to: "/dashboard/workspace/$workspaceId",
              params: { workspaceId: workspace.id },
            });
          },
        },
      ]
      : []),
    {
      text: title,
    },
  ];

  return (
    <>
      <Layout.Header>
        <div className="flex w-full items-center justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-1">
            <Tooltip
              content={
                <span className="flex items-center gap-2 text-[10px]">
                  {t("navigation:settingsLayout.toggleSidebar")}
                  <ShortcutKeys id="toggleSidebar" />
                </span>
              }
              placement="bottom"
            >
              <SidebarTrigger className="-ml-1 h-6 w-6" />
            </Tooltip>

            <div className="mx-1.5 h-4 w-px shrink-0 bg-border/80" />

            <Breadcrumbs items={items} />
          </div>
          <div className={cn("flex shrink-0 items-center gap-1.5", className)}>
            {headerActions}
          </div>
        </div>
      </Layout.Header>
      <Layout.Content>{children}</Layout.Content>
    </>
  );
}