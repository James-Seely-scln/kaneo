import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@blueprintjs/core";
import useActiveWorkspace from "@/hooks/queries/workspace/use-active-workspace";

export default function WorkspaceCrumbSelect() {
  const { t } = useTranslation();
  const { data: workspace } = useActiveWorkspace();
  const navigate = useNavigate();

  return (
    <Button
      variant="minimal"
      size="small"
      className="h-7 justify-between px-2 text-xs text-foreground"
      onClick={() => {
        navigate({
          to: "/dashboard/workspace/$workspaceId",
          params: { workspaceId: workspace?.id },
        });
      }}
    >
      <span className="truncate text-left">
        {workspace?.name || t("navigation:workspaceSwitcher.selectWorkspace")}
      </span>
    </Button>
  );
}
