import { useTranslation } from "react-i18next";
import type { ProjectAccessValue } from "@/components/team/project-access/project-access-value";
import { Button } from "@blueprintjs/core";

type MemberAccessButtonProps = {
  name: string;
  isOwner: boolean;
  access: ProjectAccessValue | undefined;
  onEditAccess: () => void;
};

export function MemberAccessButton({
  name,
  isOwner,
  access,
  onEditAccess,
}: MemberAccessButtonProps) {
  const { t } = useTranslation();

  if (isOwner) {
    return (
      <span className="text-[13px] text-muted-foreground">
        {t("team:projectAccess.allProjects")}
      </span>
    );
  }

  if (!access) {
    return <span className="text-[13px] text-muted-foreground">–</span>;
  }

  const accessLabel =
    access.projectAccess === "all"
      ? t("team:projectAccess.allProjects")
      : t("team:projectAccess.projectCount", {
        count: access.projectIds.length,
      });

  return (
    <Button
      type="button"
      variant="outlined"
      size="small"
      className="sm:w-full"
      aria-label={t("settings:adminWorkspaces.members.editAccess", {
        name,
        access: accessLabel,
      })}
      onClick={onEditAccess}
    >
      {accessLabel}
    </Button>
  );
}
